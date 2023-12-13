from pymongo.mongo_client import MongoClient
import os

mongo = MongoClient(
    os.getenv("MONGO_URI"), tls=True, tlsAllowInvalidCertificates=True
)
nosqldb = mongo["test"]