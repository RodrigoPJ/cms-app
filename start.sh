#!/bin/bash

# Exit on error
set -e

# Get current directory
PROJECT_DIR="$(pwd)"
echo $PROJECT_DIR

# Step 1 : start database

open -a Postgres

# Step 2 : Open iTerm2 tabs for each service
echo "🚀 Opening services in iTerm2..."

osascript <<EOF
tell application "iTerm"
  activate
  set newWindow to (create window with default profile)

  tell current session of newWindow
    write text "cd \"$PROJECT_DIR/front-end/react-client-app\" && npm install && npm run dev"
  end tell

  tell newWindow
    set newTab to (create tab with default profile)
    tell current session of newTab
      write text "cd \"$PROJECT_DIR/back-end/Auth_Server\" && npm install && npm run dev"
    end tell

    set anotherTab to (create tab with default profile)
    tell current session of anotherTab
      write text "cd \"$PROJECT_DIR/back-end/Content_Server\" && npm install && npm run dev"
    end tell
  end tell
end tell
EOF
