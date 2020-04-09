import requests
import os
import io
from tika import parser
import re
import heapq

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
            if r.headers['Content-Type'] != 'application/pdf':
                # invalid file type
                print("Invalid file url provided: not a PDF")
                return 1
            
            with open('./{0}'.format(self.file_name), 'wb') as f:
                f.write(r.content)

            if (r.status_code == 200):
                return 0
            else:
                return 1
        
    def cleanup(self):
        '''
        Delete the pdf that was downloaded.
        '''
        path = "./{0}".format(self.file_name)
        if os.path.isfile(path):
            os.system("rm -f {0}".format(path))

    def naive_summarize(self, length=2):
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

        # Find the abstract, store as string
        abs_start_pos = article_raw.lower().find('abstract')
        abs_length = article_raw[abs_start_pos:].find('.\n\n')
        abs_raw = article_raw[abs_start_pos:abs_start_pos+abs_length]

        # Separate the paragraph into list of sentences
        abs_sentences = abs_raw.split('.')

        # Remove special characters, capital letters
        abs_sentences = [sentence.replace('-\n', '') for sentence in abs_sentences]
        abs_sentences = [sentence.replace('\n', ' ') for sentence in abs_sentences]
        
        # Tokenize sentences (get a list of all of the words in paragraph)
        tokenized_sentences = [sentence.split(' ') for sentence in abs_sentences]

        # Find weighted frequency of each word
        word_weights = {}
        for sentence in tokenized_sentences:
            for word in sentence:
                if word in word_weights.keys():
                    word_weights[word] += 1
                else:
                    word_weights[word] = 1
        
        max_freq = max(word_weights.values())
        for word in word_weights.keys():
            word_weights[word] = (word_weights[word]/max_freq)
        
        scores = {}
        # Calculate sentence scores (store as array)
        for i in range(len(tokenized_sentences)):
            score = 0
            sentence = tokenized_sentences[i]
            for word in sentence:
                score += word_weights[word]
            scores[i] = score

        # Extract the highest scoring sentence
        if length > len(tokenized_sentences):
            length = len(tokenized_sentences)
        sentence_indices = heapq.nlargest(length, scores, key=scores.get)
        sentence_indices.sort()
        
        # Return summary concatenated
        summary_list = []
        for index in sentence_indices:
            summary_list.append(abs_sentences[index])
        summary = '.'.join(summary_list)

        summary_response['content'] = summary + '.'

        return summary_response

def main():
    summarizer = PDFSummarizer("https://arxiv.org/pdf/1901.00483.pdf")
    summary_dict = summarizer.naive_summarize()

    if summary_dict['valid_file'] == 'n':
        print("Invalid file")
    else:
        print(summary_dict['content'])

    summarizer.cleanup()
    
if __name__ == "__main__":
    main()