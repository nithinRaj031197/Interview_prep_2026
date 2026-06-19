# JavaScript Interview Practice

Store each topic in its own folder. The React Machine Coding hub reads these files and shows **Question** + **Solution** tabs.

## Folder structure

```
JS/
├── _template/
│   ├── question.md      # Interview question (markdown)
│   └── solution.js      # Your solution
└── debounce/
    ├── question.md
    └── solution.js
```

## Add a new topic

1. Copy `_template/` → `JS/yourTopic/`
2. Edit `question.md` and `solution.js`
3. Register in `React_Machine_Coding/src/config/jsTopics.ts` (`concept`, `difficulty`, `status`)
4. Add `?raw` imports in `React_Machine_Coding/src/config/jsTopicSources.ts`
5. Set `status: "in-progress"` when ready to appear on the home page
