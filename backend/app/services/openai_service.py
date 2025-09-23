import json
from openai import AsyncOpenAI
from app.core.config import get_settings
from app.schemas.code_input_handler import CodeImprovementRequest, CodeImprovementResponse, CodeSuggestion

settings = get_settings()


# Initialize the OpenAI client with API key and base URL from settings
client = AsyncOpenAI(
    api_key=settings.OPENAI_API_KEY,
    base_url=settings.OPENAI_BASE_URL,
)

def _create_improvement_prompt(request: CodeImprovementRequest) -> str:
    """
    formats the prompt for code improvement based on the request details.
    """
    prompt = f"""
    You are a code improvement assistant. Your task is to analyze the provided code following {request.language} and suggest improvements based on the specified improvement type.
    
    CODE TO IMPROVE:
    ```{request.language}
    {request.code}

    {f"CONTEXT: {request.context}" if request.context else ""}

    IMPROVEMENT TYPE: {request.improvement_type}

    Analyze the code and provide specific improvements. Focus on:
    1. Performance optimizations
    2. Security vulnerabilities
    3. Readability improvements
    4. Best practices for {request.language}
    5. Potential bugs or edge cases

    Return your response in the following JSON format:
    {{
    "suggestions": [
    {{
    "original_code": "specific code snippet that needs improvement",
    "improved_code": "improved version of the code",
    "explanation": "detailed explanation of why this improvement is helpful",
    "category": "category of the improvement (performance, security, style, bug)"
    }}
    ...
    ],
    "summary": "overall summary of the improvements and key takeaways"
    }}

    Be specific and actionable in your suggestions.
    """
    return prompt

async def improve_code(request: CodeImprovementRequest) -> CodeImprovementResponse:
    
    """
    sends a code improvement request to the OpenAI API and returns the structured response.
    """
    prompt = _create_improvement_prompt(request)
    
    try:
        response = await client.chat.completions.create(
                model="openai/gpt-4o-mini",
                messages = [
                {"role": "system", "content": "You are an expert code reviewer and improver. Analyze the code and provide specific, actionable improvements. Format your response as a valid JSON according to the specified schema."},
                {"role": "user", "content": prompt}
            ],
            response_format={"type": "json_object"}
        )

        
        # Parse the JSON response from the model
        response_text = response.choices[0].message.content
        
        # Convert the JSON response to pydantic model
        try:
            result_dict = json.loads(response_text)
            suggestions = [
                CodeSuggestion(
                    original_code=sugg.get("original_code", ""),
                    improved_code=sugg.get("improved_code", ""),
                    explanation=sugg.get("explanation", ""),
                    category=sugg.get("category", "")
                )
                for sugg in result_dict.get("suggestions", [])
            ]
            return CodeImprovementResponse(
                suggestions=suggestions,
                summary=result_dict.get("summary", "No summary provided.")
            )
        except json.JSONDecodeError:
            return CodeImprovementResponse(
                suggestions=[],
                summary="Failed to parse response from LLM."
            )
    except Exception as e:
        # Handle exceptions (e.g., API errors)
        return CodeImprovementResponse(
            suggestions=[],
            summary=f"Error during OpenAI API call: {str(e)}"
        )