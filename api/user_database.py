from pymongo import MongoClient
from pprint import pprint

client = MongoClient("mongodb+srv://breakdown:FixUp_11!@cluster0-ezpqi.mongodb.net")

db = client.breakdown

def get_data(): #return one person in the database
    return { 
            "id": "0001",
            "summaries": [
                {
                    "date": "04/12/20",
                    "time": "12:34PM EST",
                    "genre": "Game Theory",
                    "title": "Risk-Averse Equilibrium Analysis and Computation",
                    "summary": "We provide closed form characterisations of the risk-adjusted probabilities under different market regimes and a distributed algorithm for risk trading mechanism relying on the Generalized potential game structure of the problem. The impact of risk heterogeneity and financial contracts on the prosumers\u2019 expected costs are analysed numerically in a three node network and the IEEE 14-bus network.",
                    "url": "https://arxiv.org/pdf/2004.02470.pdf"
                },
                {
                            "date": "04/10/20",
                            "time": "12:34PM EST",
                            "genre": "N/A",
                            "title": "Optimal Behavior Planning for Autonomous Driving: A Generic Mixed-Integer Formulation",
                            "summary": "Based on a triple integrator model formulation, we compute the orientation of the vehicle and model it in a disjunctive manner. We show the applicability in two benchmark scenarios and prove the feasibility by solving the same models using nonlinear optimization.",
                            "url": "https://arxiv.org/pdf/2003.13312.pdf"
                },
                        {
                            "date": "04/07/20",
                            "time": "12:34PM EST",
                            "genre": "N/A",
                            "title": "Data Augmentation Using Generative Networks to Identify Dementia",
                            "summary": "Due to ethical concerns and data privacy, the number of people that can be recruited to such experiments is generally smaller than the number of participants contributing to non-healthcare datasets. In this paper, we investigate the application of a similar approach to different types of speech and audio-based features extracted from interactions recorded with our automatic dementia detection system.",
                            "url": "https://arxiv.org/pdf/2004.05989.pdf"
                        },
                        {
                            "date": "04/06/20",
                            "time": "12:34PM EST",
                            "genre": "N/A",
                            "title": "From Inference to Generation: End-to-End Fully Self-Supervised Generation of Human Face from Speech",
                            "summary": "We analyze the extent to which the network can naturally disentangle two latent factors that contribute to the generation of a face image one that comes directly from a speech signal and the other that is not related to it and explore whether the network can learn to generate natural human face image distribution by modeling these factors. Experimental results show that the proposed network can not only match the relationship between the human face and speech, but can also generate the high-quality human face sample conditioned on its speech.",
                            "url": "https://arxiv.org/pdf/2004.05830.pdf"
                        },
                        {
                            "date": "03/18/20",
                            "time": "12:34PM EST",
                            "genre": "N/A",
                            "title": "Improved Speech Representations with Multi-Target Autoregressive Predictive Coding",
                            "summary": "In this paper we extend this hypothesis and aim to enrich the information encoded in the hidden states by training the model to make more accurate future predictions. Experimental results on phonetic classification, speech recognition, and speech translation not only support the hypothesis, but also demonstrate the effectiveness of our approach in learning representations that contain richer phonetic content.",
                            "url": "https://arxiv.org/pdf/2004.05274.pdf"
                        },
                        {
                            "date": "03/05/20",
                            "time": "12:34PM EST",
                            "genre": "N/A",
                            "title": "Punctuation Prediction in Spontaneous Conversations: Can We Mitigate ASR Errors with Retrofitted Word Embeddings?",
                            "summary": "Automatic Speech Recognition (ASR) systems introduce  word errors, which often confuse punctuation prediction  models, turning punctuation restoration into a challenging  task. These errors usually take the form of homonyms.",
                            "url": "https://arxiv.org/pdf/2004.05985.pdf"
                        },
                        {
                            "date": "02/17/20",
                            "time": "12:34PM EST",
                            "genre": "N/A",
                            "title": "Advancing Speech Synthesis using EEG",
                            "summary": "First we demonstrate predicting acoustic features directly from EEG features using our attention model and then we demonstrate predicting acoustic features from EEG features using a two-step approach where in the first step we use our attention model to predict articulatory features from EEG features and then in second step another attention-regression model is trained to transform the predicted articulatory features to acoustic features. Introduction We human beings have the unique ability to communicate with each other by producing intelligible speech but people recovering from stroke, amyotrophic lateral sclerosis (ALS) etc suffer from aphasia and other speaking disabilities which makes it challenging for them to produce intelligible speech.",
                            "url": "https://arxiv.org/pdf/2004.04731.pdf"
                        },
                        {
                            "date": "02/13/20",
                            "time": "12:34PM EST",
                            "genre": "N/A",
                            "title": "Genearting Multilingual Voices Using Speaker Space Translation Based on Bilingual Speaker Data",
                            "summary": "We present progress towards bilingual Text-to-Speech which is able to transform a monolingual voice to speak a second language while preserving speaker voice quality. We demonstrate that a bilingual speaker embedding space contains a separate distribution for each language and that a simple transform in speaker space generated by the speaker embedding can be used to control the degree of accent of a synthetic voice in a language.",
                            "url": "https://arxiv.org/pdf/2004.04972.pdf"
                        }
                    ]
        }

def populate_database():
    data = get_data()
    db.users.insert_one(data)

if __name__ == "__main__":
    populate_database()
