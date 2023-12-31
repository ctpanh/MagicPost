import enum
import database
from sqlalchemy import Column, Integer, Date, Enum, ForeignKey, String
from datetime import date

class TransactionType(str, enum.Enum):
    DELIVER = "Deliver"
    RETURN = "Return"

class TransactionStatus(str, enum.Enum):
    RECEIVED = "received"
    SENDING = "sending"
    SHIPPED = "shipped"
    RETURN = "return"

class TransactionModel(database.Base):
    __tablename__ = "transactions"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    code = Column(String(15), nullable= False, index=True)
    sender_id = Column(Integer, ForeignKey("customers.id"))
    receiver_id = Column(Integer, ForeignKey("customers.id"))
    cur_warehouse_id = Column(Integer, ForeignKey("warehouses.id"))
    transaction_send_date = Column(Date(), default=date)
    transaction_receive_date = Column(Date(), nullable=True)
    transaction_type = Column(Enum(TransactionType))
    status = Column(Enum(TransactionStatus))