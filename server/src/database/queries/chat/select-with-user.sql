SELECT * FROM chat WHERE (chat.firstUserId = $firstUserId OR chat.firstUserId = $secondUserId) AND (chat.secondUserId = $secondUserId OR chat.secondUserId = $firstUserId)