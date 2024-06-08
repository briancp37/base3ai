previousChats = [
    {
        "title": "Chat 1",
        "thread_id": "uuid-1234",
        "history": [
            {
                "role": "user",
                "content": "Hello, I need help with my travel plans.",
                "dest_arr": ["Paris", "London"]
            },
            {
                "role": "assistant",
                "content": "Sure, I can help you with that. What destinations are you considering?"
            }
        ]
    },
    {
        "title": "Chat 2",
        "thread_id": "uuid-5678",
        "history": [
            {
                "role": "user",
                "content": "Can you find me a flight to New York?",
                "dest_arr": ["New York"]
            },
            {
                "role": "assistant",
                "content": "Here are some flight options for New York."
            }
        ]
    }
]


message = {
    'messages': [
        {
            'role': 'user',
            'content': 'Hello, I need help with my travel plans.'
        },
        {
            'role': 'assistant',
            'content': 'Sure, I can help with that. Where are you planning to go?',
            'dest_arr': ['New York', 'Los Angeles']
        }
    ]
  }

threadFlightData = [
    {
        'id':'id',
        'user_id':'user_id',
        'thread_id':'thread_id',
        'kiwi_id':'kiwi_id',
        'thread_fav': bool,
        'user_fav': bool,
        'flight_data': {},
        'datecreated':'datecreated',
        'dateupdated':'dateupdated',
        'run_id':'run_id',
        'human_message_id':'human_message_id',
        'ai_message_id':'ai_message_id',
     }
]

flightSearchParams = [
    {
        "ai_message_id": "run-6b95f6ea-d6fd-47c4-82c1-679ea32edbdc-0",
        "datecreated": "Tue, 04 Jun 2024 15:22:09 GMT",
        "dateupdated": "Tue, 04 Jun 2024 15:22:13 GMT",
        "human_message_id": "428eca4b-f419-419d-a85a-f72e98ce75d2",
        "id": 14,
        "params": {
            "destination": "CDG",
            "limit": 10,
            "origin": "AUS",
            "outbound_date_from": "01/10/2024",
            "outbound_date_to": "31/10/2024"
        },
        "run_id": "ce53d272-4d49-4d24-ae66-2f2af7b46d1f",
        "thread_id": "c8d09008-f0bb-4515-8723-b4d2c0d0c94b",
        "user_id": "44e0d581-5a69-424d-9d42-5550f4627882"
    },
    {
        "ai_message_id": "run-679ea32edbdc-d6fd-47c4-82c1-6b95f6ea-0",
        "datecreated": "Tue, 04 Jun 2024 15:22:09 GMT",
        "dateupdated": "Tue, 04 Jun 2024 15:22:13 GMT",
        "human_message_id": "428eca4b-f419-419d-a85a-f72e98ce75d2",
        "id": 14,
        "params": {
            "destination": "CDG",
            "limit": 10,
            "origin": "AUS",
            "outbound_date_from": "01/10/2024",
            "outbound_date_to": "31/10/2024"
        },
        "run_id": "ce53d272-4d49-4d24-ae66-2f2af7b46d1f",
        "thread_id": "c8d09008-f0bb-4515-8723-b4d2c0d0c94b",
        "user_id": "44e0d581-5a69-424d-9d42-5550f4627882"
    }
]