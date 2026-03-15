#!/usr/bin/env python3

import sys

# Define the rooms
rooms = {
    'Hall': {
        'description': 'You are in the hall. There are doors to the north, south, east, and west.',
        'items': ['key'],
        'connections': {'north': 'Kitchen', 'east': 'Bedroom', 'west': 'Bathroom'},
        'ghost': False
    },
    'Kitchen': {
        'description': 'You are in the kitchen. There is a door to the south.',
        'items': [],
        'connections': {'south': 'Hall'},
        'ghost': True
    },
    'Bedroom': {
        'description': 'You are in the bedroom. There is a door to the west.',
        'items': ['key'],
        'connections': {'west': 'Hall'},
        'ghost': False
    },
    'Bathroom': {
        'description': 'You are in the bathroom. There is a door to the east.',
        'items': [],
        'connections': {'east': 'Hall'},
        'ghost': False
    },
    'Garden': {
        'description': 'You are in the garden. You have escaped the haunted house!',
        'items': [],
        'connections': {},
        'ghost': False
    }
}

# Add connection to garden from hall, but locked
rooms['Hall']['connections']['south'] = 'Garden'  # but need key to unlock

# Player state
current_room = 'Hall'
inventory = []
keys_needed = 2  # number of keys to collect

def show_room():
    room = rooms[current_room]
    print(room['description'])
    if room['items']:
        print(f"You see: {', '.join(room['items'])}")
    if room['ghost']:
        print("A ghost appears and scares you to death!")
        print("Game Over!")
        sys.exit()

def get_command():
    return input("> ").strip().lower()

def process_command(command):
    global current_room
    parts = command.split()
    if not parts:
        return
    verb = parts[0]
    if verb == 'go':
        if len(parts) < 2:
            print("Go where?")
            return
        direction = parts[1]
        # Map abbreviations to full directions
        direction_map = {
            'n': 'north',
            's': 'south',
            'e': 'east',
            'w': 'west'
        }
        if direction in direction_map:
            direction = direction_map[direction]
        room = rooms[current_room]
        if direction in room['connections']:
            next_room = room['connections'][direction]
            if next_room == 'Garden' and len([i for i in inventory if i == 'key']) < keys_needed:
                print("The door is locked. You need more keys.")
                return
            current_room = next_room
            show_room()
        else:
            print("You can't go that way.")
    elif verb == 'take':
        if len(parts) < 2:
            print("Take what?")
            return
        item = parts[1]
        room = rooms[current_room]
        if item in room['items']:
            room['items'].remove(item)
            inventory.append(item)
            print(f"You took the {item}.")
        else:
            print("There is no such item here.")
    elif verb == 'inventory':
        if inventory:
            print(f"You have: {', '.join(inventory)}")
        else:
            print("Your inventory is empty.")
    elif verb == 'quit':
        print("Thanks for playing!")
        sys.exit()
    else:
        print("I don't understand that command.")

def main():
    print("Welcome to The Haunted House!")
    print("Collect keys to unlock the garden and escape.")
    print("Avoid rooms with ghosts.")
    print("Commands: go <direction>, take <item>, inventory, quit")
    show_room()
    while True:
        command = get_command()
        process_command(command)
        if current_room == 'Garden':
            print("Congratulations! You escaped!")
            break

if __name__ == "__main__":
    main()