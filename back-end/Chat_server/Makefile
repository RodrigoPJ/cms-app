# Define variables
HOST = localhost
PORT = 8000
APP = src.main:app
VENV_DIR = .venv

.PHONY: dev

# Target to run the FastAPI development server
dev:
	. $(VENV_DIR)/bin/activate; uvicorn $(APP) --host $(HOST) --port $(PORT) --reload --ssl-keyfile="/Users/rodrigopena/Documents/cms-app/back-end/Chat_server/certificates/localhost+2-key.pem" --ssl-certfile="/Users/rodrigopena/Documents/cms-app/back-end/Chat_server/certificates/localhost+2.pem"


.PHONY: run

run:
	. $(VENV_DIR)/bin/activate; fastapi dev main.py --host 0.0.0.0
