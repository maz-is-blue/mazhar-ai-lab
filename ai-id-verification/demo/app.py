import gradio as gr
from preprocessing.preprocess import preprocess_image
from ocr.extract import extract_fields


def process(image):
    with open(image, "rb") as f:
        img_bytes = f.read()
    processed = preprocess_image(img_bytes)
    return extract_fields(processed)

with gr.Blocks() as demo:
    gr.Markdown("# AI ID Verification Demo")
    inp = gr.File(label="Upload ID Image")
    out = gr.JSON(label="Extracted Fields")
    btn = gr.Button("Extract")
    btn.click(process, inputs=inp, outputs=out)

if __name__ == "__main__":
    demo.launch()
