# 📝 Changelog

All notable changes to the WhatsApp Extension Manager project.

## [1.1.0] - 2024-02-07

### 🎉 Bug Fixes and Improvements

#### Fixed Issues
- **Sidebar Overlay**: Fixed sidebar overlap issue - now pushes WhatsApp content to the right instead of overlaying it
- **Message Signature**: Fixed name not appearing in messages - signature now correctly prepends to messages
- **Auto-detection**: Implemented automatic recognition and addition of new chats to Kanban
- **Visual Indicators**: Enhanced colored dots to appear reliably in WhatsApp Web chat list

#### Technical Improvements
- Added `margin-left: 50px` to WhatsApp's #app container to prevent overlap
- Changed signature injection from append to prepend for better visibility
- Implemented debounced MutationObserver for efficient auto-detection
- Improved name matching algorithm for visual indicators (case-insensitive, partial match)
- Added automatic initialization of chat observation on page load
- Enhanced chat indicator in conversation header

#### Code Quality
- Added proper cursor positioning after signature injection
- Improved error handling in auto-detection logic
- Added console logging for debugging auto-detection
- Better fallback for phone number generation when not available

## [1.0.0] - 2024-02-07

### 🎉 Complete Refactoring

This version represents a complete refactoring of the WhatsApp Extension Manager, focusing on simplicity and the Kanban system.

### ✅ Added

#### Core Features
- **Kanban System**: Complete task management with 5 status columns
  - 🟢 Novo (New)
  - 🟡 Em Atendimento (In Service)
  - 🔴 Aguardando (Waiting)
  - ⏸️ Pausado (Paused)
  - ✅ Resolvido (Resolved)
- **Drag & Drop**: Move cards between columns to update status
- **Visual Indicators**: Colored dots appear in WhatsApp chat list
- **User Profile**: Simplified profile with name, role, and message signature
- **Slim Sidebar**: 50px always-visible sidebar with 3 buttons (Kanban, Profile, Settings)

#### Technical Implementation
- `content/storage.js`: Simplified localStorage manager (profile + kanban only)
- `content/kanban.js`: Complete Kanban manager with drag & drop
- `content/sidebar.js`: UI manager with modals and event handling
- `content/sidebar.css`: Complete styling for sidebar and modals
- `content/whatsapp-injector.js`: Message signature injection
- `background/service-worker.js`: Minimal service worker
- `popup/`: Complete popup interface (HTML, CSS, JS)
- `assets/icons/`: Extension icons (16x16, 48x48, 128x128)

#### UI/UX
- Modern, clean interface with WhatsApp green theme (#128C7E)
- Smooth animations and transitions
- Responsive design for different screen sizes
- Drag & drop visual feedback
- Real-time preview of message signature format

#### Data Management
- localStorage for primary data storage
- chrome.storage.local sync for popup access
- Export/Import functionality (JSON format)
- Clear all data option

#### Documentation
- Complete README.md with features and installation guide
- GUIA.md: Comprehensive user guide in Portuguese
- QUICK-REFERENCE.md: Quick reference card for users
- test.html: Test page to verify installation

### ❌ Removed

#### Deprecated Features
- **Evolution API Integration**: Completely removed
  - Configuration fields (URL, API Key, Instance)
  - Connection test function
  - "Send via API" option
  - All webhook/external API code
  - Integration functions
  
- **Separate Message History**: Completely removed
  - History tab/modal
  - Old message storage
  - Export history functions
  - Message statistics (today/total)
  - `wem_messages` localStorage key

- **Dead Code**: Cleaned up unused functions and dependencies

### 🔧 Changed

#### Storage Structure
**Before** (planned but not implemented):
- Multiple storage keys for different features
- Complex data structures

**After** (implemented):
- Only 2 storage keys: `wem_user_profile` and `wem_kanban`
- Simple, flat data structures
- Immediate chrome.storage sync on save

#### User Interface
**Before** (planned):
- Complex multi-tab interface
- History statistics
- API configuration screens

**After** (implemented):
- Slim 50px sidebar
- 3 simple modals (Kanban, Profile, Settings)
- Clean, focused design

### 🐛 Fixed

- Added proper error handling for chrome.tabs.sendMessage
- Fixed signature position (now appended at end of message instead of prepended)
- Removed inefficient periodic localStorage sync
- Fixed phone number detection logic
- Added proper chrome.runtime.lastError checks
- Clarified auto-detection limitations in documentation

### 🔒 Security

- CodeQL scan completed: **0 vulnerabilities**
- All data stored locally (no external servers)
- No tracking or analytics
- No sensitive data exposure

### 📊 Code Quality

- Clean, modular code structure
- JSDoc-style comments where needed
- Consistent naming conventions
- Minimal dependencies
- Follows Chrome Extension best practices

### 🎯 Performance

- Lightweight implementation (~50KB total)
- Fast load times
- Efficient DOM manipulation
- Lazy loading of modals
- Optimized event listeners

### 🌐 Compatibility

- ✅ Google Chrome (tested)
- ✅ Microsoft Edge (compatible)
- ✅ Brave (compatible)
- ✅ Other Chromium-based browsers

### 📱 Responsive Design

- Desktop: Full-featured Kanban board
- Tablet: 3-column layout
- Mobile: Single-column layout

---

## Future Roadmap

### Planned Features
- [ ] Filters and search in Kanban
- [ ] Attendance statistics
- [ ] Custom tags for chats
- [ ] Notes and comments on cards
- [ ] Notification integration
- [ ] Dark/light themes
- [ ] Improved auto-detection using WhatsApp's internal API
- [ ] Keyboard shortcuts
- [ ] Multi-language support

### Under Consideration
- [ ] Team collaboration features
- [ ] Chat templates
- [ ] Automated responses
- [ ] CRM integration
- [ ] Advanced analytics dashboard

---

## Development Notes

### Technologies Used
- Vanilla JavaScript (no frameworks)
- Chrome Extension Manifest V3
- CSS Grid and Flexbox
- HTML5 Drag and Drop API
- Chrome Storage API
- LocalStorage API

### Design Decisions
1. **No Evolution API**: Simplified the extension by removing external dependencies
2. **No Message History**: Focused on real-time management instead of historical data
3. **Kanban-First**: Made task management the primary feature
4. **Local-Only Storage**: Ensured complete privacy by keeping all data local
5. **Minimal Dependencies**: No external libraries to reduce size and complexity

### Breaking Changes from Original Plan
- Removed Evolution API (was planned but never needed)
- Removed message history (deemed unnecessary)
- Changed from complex multi-feature app to focused Kanban tool
- Simplified profile to bare essentials

---

## Credits

**Developed with ❤️ for WhatsApp customer service teams**

## License

See LICENSE file for details.
