import apache_beam as beam
from apache_beam.options.pipeline_options import PipelineOptions
from pipeline.utils import infer_sentiment


def run_streaming(sample_path: str):
    options = PipelineOptions()
    with beam.Pipeline(options=options) as p:
        (p
         | "Read" >> beam.io.ReadFromText(sample_path)
         | "Infer" >> beam.Map(infer_sentiment)
         | "Print" >> beam.Map(print))

if __name__ == "__main__":
    run_streaming("data/sample.jsonl")
