from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from schemas.transactionSchema import CreateTransaction, CreateTransactionDetail
from controllers.transactionController import TransactionController
from database import getDatabase
from controllers.userController import verifyToken
from models.userModel import UserModel
from models.transactionModel import TransactionStatus

router = APIRouter(
    tags=["Transaction"],
    prefix="/transaction",
    responses={404: {"description": "Not found"}},
)

@router.post("/create_transactions")
def create_full_transaction(transaction: CreateTransaction, detail: CreateTransactionDetail, db: Session = Depends(getDatabase), current_user: UserModel = Depends(verifyToken)):
    return TransactionController.createTransaction(transaction=transaction, detail=detail, db=db, current_user=current_user)

@router.get("/get_transaction/{transaction_id}")
def get_transaction_by_id(transaction_id: int, db: Session = Depends(getDatabase)):
    return TransactionController.getTransactionById(transaction_id=transaction_id, db=db)

@router.get("/create_forward_sending/{transaction_id}")
def create_forward_sending(transaction_id: int, db: Session = Depends(getDatabase), current_user: UserModel = Depends(verifyToken)):
    return TransactionController.create_forward_sending(transaction_id=transaction_id, db=db, current_user=current_user)

@router.get("/confirm/{transaction_id}")
def confirm(transaction_id: int, status: TransactionStatus, db: Session = Depends(getDatabase), current_user: UserModel = Depends(verifyToken)):
    return TransactionController.confirm(transaction_id=transaction_id, status=status, db=db, current_user=current_user)

@router.get("/create_backward_sending/{transaction_id}")
def create_backward_sending(transaction_id: int, db: Session = Depends(getDatabase), current_user: UserModel = Depends(verifyToken)):
    return TransactionController.create_backward_sending(transaction_id=transaction_id, db=db, current_user=current_user)

@router.get("/get_status_quantity")
def get_status_quantity(db: Session = Depends(getDatabase), current_user: UserModel = Depends(verifyToken)):
    return TransactionController.get_status_quantity(db=db, current_user=current_user)

@router.get("/get_type_quantity")
def get_type_quantity(db: Session = Depends(getDatabase), current_user: UserModel = Depends(verifyToken)):
    return TransactionController.get_type_quantity(db=db, current_user=current_user)

@router.get("/transaction_statistic")
def transaction_statistic(db: Session = Depends(getDatabase), current_user: UserModel = Depends(verifyToken)):
    return TransactionController.transaction_statistic(db=db, current_user=current_user)
