SELECT * FROM messages INNER JOIN users on messages.userId = users.id WHERE messages.chatId = $chatId 