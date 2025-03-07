import os
import numpy as np
import faiss
from supabase import create_client, Client
from sentence_transformers import SentenceTransformer
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Supabase credentials
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

# Connect to Supabase
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Load SBERT model
model = SentenceTransformer('all-MiniLM-L6-v2')

# Fetch mentors from Supabase
response = supabase.table("mentors").select("*").execute()
mentors = response.data  # Extract mentor records



# Convert mentor profiles into text format
mentor_texts = [
    f"{mentor['name']} - {mentor['title']}. Specialties: {', '.join(mentor['specialties'])}. {mentor['bio']} "
    #f"Sessions: {', '.join([session['description'] for session in mentor['sessionTypes']])}."
    for mentor in mentors
]

# Convert text profiles into embeddings
mentor_embeddings = model.encode(mentor_texts, convert_to_tensor=True)

# Convert embeddings to a NumPy array
mentor_embeddings_np = np.array([embedding.cpu().numpy() for embedding in mentor_embeddings])

# Build FAISS index
index = faiss.IndexFlatL2(mentor_embeddings_np.shape[1])  # L2 distance (Euclidean)
index.add(mentor_embeddings_np)

# User query
user_query = "i wanna learn about finance  "
query_embedding = model.encode(user_query, convert_to_tensor=True)

# Search for the closest mentor
D, I = index.search(np.array([query_embedding.cpu().numpy()]), k=2)  # Get top 2 matches

# Display matched mentors (only ID and name)
for idx in I[0]:
   print("Mentor ID:", mentors[idx]['id'], "| Name:", mentors[idx]['name'], "| Bio:",mentors[idx]['bio'])