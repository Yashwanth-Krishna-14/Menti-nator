#step-1- import necessary libraries

import os
import numpy as np
import faiss 
from supabase import create_client, Client
from sentence_transformers import SentenceTransformer
from dotenv import load_dotenv

#step-2- Load environment variables
# Load environment variables
load_dotenv()

#step-3- Connect to Supabase
# Supabase credentials
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

# Connect to Supabase
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

#step-4- Load SBERT model
# Load SBERT model
model = SentenceTransformer('all-MiniLM-L6-v2')

#step-5- Fetch mentors from Supabase
response = supabase.table("mentors").select("*").execute()
mentors = response.data  # Extract mentor records



#step-6- Convert mentor profiles into text format
mentor_texts = [
    f"{mentor['name']} - {mentor['title']}. Specialties: {', '.join(mentor['specialties'])}. {mentor['bio']} "
    #f"Sessions: {', '.join([session['description'] for session in mentor['sessionTypes']])}."
    for mentor in mentors
]

#step-7- Convert text profiles into embeddings
mentor_embeddings = model.encode(mentor_texts, convert_to_tensor=True)

#step-8- Convert embeddings to a NumPy array
mentor_embeddings_np = np.array([embedding.cpu().numpy() for embedding in mentor_embeddings])

#step-9- Build FAISS index
index = faiss.IndexFlatL2(mentor_embeddings_np.shape[1])  # L2 distance (Euclidean)
index.add(mentor_embeddings_np)

#step-10- User query
user_query = "i wanna learn about finance  "
query_embedding = model.encode(user_query, convert_to_tensor=True)

#step-11- Search for the closest mentor
D, I = index.search(np.array([query_embedding.cpu().numpy()]), k=2)  # Get top 2 matches

#step-12- Display matched mentors (only ID and name)
for idx in I[0]:
   print("Mentor ID:", mentors[idx]['id'], "| Name:", mentors[idx]['name'], "| Bio:",mentors[idx]['bio'])