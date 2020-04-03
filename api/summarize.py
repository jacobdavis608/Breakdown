import requests
import os


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
            # download the file contents in binary format
            r = requests.get(self.file_url)
            
            # open method to open a file on your system and write the contents
            with open("./{0}".format(self.file_name), "wb") as fp:
                fp.write(r.content)
            
            return 0
        
    def delete_pdf(self):
        '''Delete the pdf that was downloaded'''
        path = "./{0}".format(self.file_name)
        if os.path.isfile(path)):
            os.system("rm -f {0}".format(path))

    def naive_summarize(self):
        '''
        Return a summary of the abstract and of the conclusion using word weights.
        '''
        summary_response = {'valid_url': 'n'}
        #Download the pdf, if the url is valid
        if self.download_pdf():
            return summary_response #should eventually be returning something useful to frontend
        else: #download success
            summary_response['valid_url'] = 'y'
            


        return summary_response


# https://arxiv.org/pdf/2003.13312.pdf

def main():
    summarizer = PDFSummarizer("http://arxiv.org/pdf/2003.13312.pdf")
    if not summarizer.download_pdf():
        print("Success")

    
if __name__ == "__main__":
    main()