name: Birthday Email Sender

on:
  schedule:
    - cron: "0 0 * * *"  # Runs every day at midnight (UTC)

jobs:
  send-birthday-emails:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout repository
      uses: actions/checkout@v3

    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'

    - name: Install dependencies
      run: npm install

    - name: Run birthday email script
      env:
        BREVO_API_KEY: ${{ secrets.BREVO_API_KEY }}
        FIREBASE_SERVICE_ACCOUNT: ${{ secrets.FIREBASE_SERVICE_ACCOUNT }}
      run: |
        echo "$FIREBASE_SERVICE_ACCOUNT" > serviceAccountKey.json
        node birthday-checker.js