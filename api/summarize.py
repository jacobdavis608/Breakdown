import requests
import os
import io
from tika import parser


class PDFSummarizer():
    '''
    Summarizes a scholarly document in the form of a series of sentences.
    Allows the user to specify the summarizer type.
    '''
    def __init__(self, url, return_size=2):
        self.file_url = url
        url_components = self.file_url.split('/')
        self.file_name = url_components[-1]
        self.ret_size = return_size                # Number of sentences in summary

    def download_pdf(self):
        '''Download the pdf to summarize'''
        #check if file type is pdf
        file_comps = self.file_name.split('.')
        if file_comps[-1] != 'pdf':
            print("Invalid file url provided: not a PDF")
            return 1
        else: #document is a pdf
            # download the file contents
            r = requests.get(self.file_url)
            
            if (r.status_code == 200):
                return 0
            else:
                return 1
        
    def delete_pdf(self):
        '''
        Delete the pdf that was downloaded
        '''
        path = "./{0}".format(self.file_name)
        if os.path.isfile(path):
            os.system("rm -f {0}".format(path))

    def naive_summarize(self):
        '''
        Return a summary of the abstract and of the conclusion using word weights.
        '''
        summary_response = {'valid_file': 'n'}
        #Download the pdf, if the url is valid
        if self.download_pdf():
            return summary_response #should eventually be returning something useful to frontend
        else: #download success, check if file can be parsed
            try: #try to load article
                article_raw = parser.from_file("./{0}".format(self.file_name))['content']
            except:
                return summary_response
            
            summary_response['valid_file'] = 'y'

        # Find the abstract and conclusion, store as strings
        abstract_pos = article_raw.lower().find('abstract')
        
        

        # Separate the paragraphs into lists

        # Remove special characters, capital letters

        # Tokenize sentences (get a list of all of the words in paragraph)

        # Find weighted frequency of each work

        # Calculate sentence scores (store as array)

        # Extract the highest scoring sentence from each paragraph

        # Return summary concatenated

        return summary_response


# https://arxiv.org/pdf/2003.13312.pdf

def main():
    summarizer = PDFSummarizer("https://arxiv.org/pdf/2003.13839.pdf")
    summary_dict = summarizer.naive_summarize()
    
if __name__ == "__main__":
    main()