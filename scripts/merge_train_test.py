import pandas as pd
from datetime import datetime

# Read both CSV files
train = pd.read_csv('data/original/train.csv')
test = pd.read_csv('data/original/test.csv')
test = test.sample(n=25, random_state=42)

# Add Survived column to test with NaN values
test['Survived'] = pd.NA
test['Survived'] = "[PREDICT]"

# Reorder columns to match train.csv order
test = test[train.columns]

# Merge the dataframes
merged = pd.concat([train, test], ignore_index=True)

# Save the merged CSV
merged.to_csv(f'data/merged_train_test_{datetime.now().strftime("%Y%m%d%H%M%S")}.csv', index=False)

print(f"Merged CSV created successfully!")
print(f"Train rows: {len(train)}")
print(f"Test rows: {len(test)}")
print(f"Total merged rows: {len(merged)}")
