from fastapi import APIRouter, Depends, HTTPException, status
from app.schemas.code_input_handler import CodeImprovementRequest, CodeImprovementResponse
from app.services import openai_service
from app.core.auth import get_current_user
from app.schemas.users import UserResponse

router = APIRouter(
    prefix="/analyze-code",
    tags=["analyze-code"],
    dependencies=[Depends(get_current_user)]
)


@router.post("/improve", response_model=CodeImprovementResponse)
async def improve_code(request: CodeImprovementRequest, current_user: UserResponse = Depends(get_current_user)):
    """
    get code improvement suggestions from OpenAI based on the provided code and improvement type.
    """
    try:
        result = await openai_service.improve_code(request)
        return result
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail=f"Error while processing code improvement: {str(e)}"
                            )