import sys
from loguru import logger

# Configure logger
logger.remove()
logger.add(sys.stderr, level="INFO")
logger.add("logs/kiralink_{time}.log", level="INFO", rotation="10 MB", retention="10 days", compression="zip")

app_logger = logger 