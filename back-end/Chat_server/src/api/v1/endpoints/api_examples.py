from fastapi import APIRouter
from fastapi.responses import PlainTextResponse, HTMLResponse
from typing import Union
import logging
from fastapi import Request

router = APIRouter()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@router.get("/", response_class=HTMLResponse)
async def read_root():
    return "<h1>hello ana banana bofana sudana anana</h1>"

@router.get("/items/{item_id}")
async def read_item(item_id: int, query: Union[str, None] = None):
    """This is just for show the example on reading query-params"""
    return {"item_id": item_id, "query": query}

@router.get("/query-params")
async def read_params(request: Request):
    all_params = request.query_params
    params_dict = dict(all_params)
    logging.info("params", all_params)
    return {"params": params_dict}

@router.post("/payload")
async def read_payload(request: Request):
    payload = await request.json()
    payload_dict = dict(payload)
    return payload_dict
