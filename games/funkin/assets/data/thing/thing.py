import subprocess
import os

def change_frame_rate(input_file, output_file, new_fps):
    """
    Change the frame rate of a video using ffmpeg.
    
    :param input_file: Path to the input video file.
    :param output_file: Path to the output video file.
    :param new_fps: The new frame rate to set for the video.
    """
    # Construct the ffmpeg command
    command = [
        'ffmpeg',
        '-i', input_file,         # Input file
        '-vf', f'fps={new_fps}',  # Set frame rate
        output_file                # Output file
    ]
    
    try:
        # Run the command
        subprocess.run(command, check=True)
        print(f"Video processed and saved as {output_file} with {new_fps} fps.")
    except subprocess.CalledProcessError as e:
        print(f"Error occurred while processing video: {e}")
    except FileNotFoundError:
        print("ffmpeg is not installed or not found in PATH.")

if __name__ == "__main__":
    input_filename = 'input_video.mp4'  # Replace with your input file name
    output_filename = 'output_video.mp4' # Replace with your desired output file name
    new_fps = 6.5
    
    if not os.path.exists(input_filename):
        print(f"Input file {input_filename} does not exist.")
    else:
        change_frame_rate(input_filename, output_filename, new_fps)
