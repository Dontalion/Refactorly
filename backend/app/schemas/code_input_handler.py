from pydantic import BaseModel, Field
from typing import Optional, List


class CodeImprovementRequest(BaseModel):
    """Schema for code improvement request."""
    code: str = Field(..., min_length=5, max_length=1000, description="The code snippet to be improved.")
    language: str = Field(..., description="The programming language of the code snippet.")
    context: Optional[str] = Field(None, description="Additional context for the code improvement.")
    improvement_type: Optional[str] = Field(None, description="Type of improvement requested (e.g., optimization, refactoring).")
    
    
class CodeSuggestion(BaseModel):
    """Schema for code suggestion."""
    original_code: str
    improved_code: str
    explanation: str
    category: str = Field(..., description="Category of the suggestion (e.g., optimization, refactoring).")
    
class CodeImprovementResponse(BaseModel):
    suggestions: List[CodeSuggestion]
    summary: str