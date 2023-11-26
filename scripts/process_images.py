import pathlib

from PIL import Image


def process_figures(path: str) -> None:
    """Given a path (directory or filepath) process all figures
    in the path by resizing them into the 180x300 standard of the website
    and recude the quality for faster loading"""

    if pathlib.Path(path).is_dir():
        for filename in pathlib.Path(path).iterdir():
            image = Image.open(filename)

            # if image has the correct size then it was already process,
            # then dont process it (it would reduce the quality every time)
            if (image.size[0] != 180) and (image.size[1] != 300):
                image = image.resize((180, 300))
                image.save(filename, quality=60, optimize=True)

            else:
                print(f"Note: Image {filename} was processed already. Skipping it.")

    elif pathlib.Path(path).is_file():
        image = Image.open(path)

        # if image has the correct size then it was already process,
        # then dont process it (it would reduce the quality every time)
        if (image.size[0] != 180) and (image.size[1] != 300):
            image = image.resize((180, 300))
            image.save(filename, quality=60, optimize=True)

        else:
            print(f"Note: Image {path} was processed already. Skipping it.")


if __name__ == "__main__":

    import argparse

    # example python process_images.py --path="./figures/items"
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--path",
        type=str,
        required=True,
        help="String path to the directory or filename where the pictures to be processed are.",
    )
    args = parser.parse_args()

    process_figures(path=args.path)
