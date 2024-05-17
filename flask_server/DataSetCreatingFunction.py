import pandas as pd
import random

# Read the CSV file into a pandas DataFrame
df = pd.read_csv('colors.csv')

# Define the list of values
values = [
    "65f9ea319a9354a3f5193a65",
    "65fabb46962db3adedf2cf31",
    "65fac094962db3adedf2cfe0",
    "65fac11d962db3adedf2cffe",
    "65fac165962db3adedf2d007",
    "65fac193962db3adedf2d00e"
]

# Shuffle the list to randomize the order
random.shuffle(values)

# Add new columns to the DataFrame
df['new_column1'] = ''
df['new_column2'] = ''
df['new_column3'] = ''

# Iterate over each row and assign random values from the list
for index, row in df.iterrows():
    unique_values = random.sample(values, 3)  # Select 3 unique values randomly
    df.at[index, 'new_column1'] = unique_values[0]
    df.at[index, 'new_column2'] = unique_values[1]
    df.at[index, 'new_column3'] = unique_values[2]

# Save the modified DataFrame back to a new CSV file
df.to_csv('output_file.csv', index=False)
