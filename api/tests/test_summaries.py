import sys
sys.path.append("..")
from summarize import PDFSummarizer
import json

def test_naive_pipeline():
    articles = []
    with open("all_valid_pdfs.txt") as f:
        content = f.read()
        articles = content.split('\n')

    successful_summaries = 0
    summaries = {}
    for article_url in articles:
        summarizer = PDFSummarizer(article_url)
        try:
            summary = summarizer.naive_summarize()
            if summary['valid_file'] == 'y' and len(summary['content']):
                successful_summaries += 1
        except:
            summarizer.cleanup()
            continue
        summarizer.cleanup()
        summaries[article_url] = summary

    with open("test_summaries.json", 'w') as fp:
        json.dump(summaries, fp)

    assert successful_summaries == len(articles)

def test_validity_check():
    articles = []
    with open("random_urls.txt") as f:
        content = f.read()
        articles = content.split('\n')

    bad_links = 0
    for article_url in articles:
        summarizer = PDFSummarizer(article_url)
        bad_links += summarizer.download_pdf()

        summarizer.cleanup()
    
    assert bad_links == 5 # 5 bad links in the input file
