from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import ENGLISH_STOP_WORDS
import re
from collections import Counter
from typing import Dict



# Load once globally
model = SentenceTransformer('all-MiniLM-L6-v2')


def extract_keywords(text: str, top_n: int = 5):
    words = re.findall(r'\b\w+\b', text.lower())
    filtered = [w for w in words if w not in ENGLISH_STOP_WORDS and len(w) > 2]
    return [w for w, _ in Counter(filtered).most_common(top_n)]


def analyzer(cv: str, jd: str) -> Dict[str, str]:
    # Semantic similarity using SentenceTransformer
    cv_vector = model.encode(cv)
    jd_vector = model.encode(jd)
    score = cosine_similarity([cv_vector], [jd_vector])[0][0]
    match_score = round(score * 100, 2)

    # Keyword extraction
    cv_keywords = extract_keywords(cv)
    jd_keywords = extract_keywords(jd)

    # Final analysis summary
    summary = "Match Score: {match_score}%. <br/>Top CV Keywords: {', '.join(cv_keywords)}. <br/>Top JD Keywords {', '.join(jd_keywords)}."

    return {"analyzed_text": summary}
