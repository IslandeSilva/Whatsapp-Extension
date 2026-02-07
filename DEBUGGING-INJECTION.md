# 🔍 Debugging WhatsApp Message Injection

## Problem Report
User reported: "só aparece *Response:*" ("only *Response:* appears")

Expected behavior: User's configured name (e.g., "*João Silva:*") should appear at the beginning of messages.

## How to Debug

### Step 1: Load the Extension
1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top-right)
3. Click "Load unpacked"
4. Select the `extension/` folder
5. Verify the extension is loaded and enabled

### Step 2: Open WhatsApp Web with Console
1. Go to https://web.whatsapp.com
2. Open Chrome DevTools (F12 or right-click → Inspect)
3. Go to the Console tab
4. Look for `[WEM]` prefixed messages

### Step 3: Configure Profile
1. Click the Profile button (👤) in the sidebar
2. Enter a test name (e.g., "Test User")
3. Select a message format (e.g., "*{name}:*")
4. Click "Save Profile"
5. Check console for: `[WEM] Saving profile:` followed by profile data
6. Check console for: `[WEM Storage] Saving profile to localStorage:`

### Step 4: Verify Profile Storage
In the Console tab, run:
```javascript
localStorage.getItem('wem_user_profile')
```

Expected output: JSON string like:
```json
{"userName":"Test User","userRole":"","userAvatar":"","messageFormat":"*{name}:*"}
```

If userName is empty, "Response", or something unexpected, that's the problem!

### Step 5: Send a Test Message
1. Select any WhatsApp chat
2. Type a message (e.g., "Hello")
3. Press Enter or click Send button
4. Watch the console for [WEM] messages

Expected console output:
```
[WEM] injectSignature called
[WEM Storage] Getting profile from localStorage: {userName: "Test User", ...}
[WEM] Profile loaded: {userName: "Test User", ...}
[WEM] formatSignature - format: *{name}:* userName: Test User result: *Test User:*
[WEM] Generated signature: *Test User:*
[WEM] New text to inject: *Test User:* Hello
[WEM] Signature injection complete
```

### Step 6: Check the Message
Look at the message in WhatsApp. It should show:
```
*Test User:* Hello
```

## Common Issues and Solutions

### Issue 1: No [WEM] logs appear
**Problem**: Extension scripts not loading
**Solution**: 
- Reload the extension
- Refresh WhatsApp Web page
- Check for JavaScript errors in console

### Issue 2: "No profile or empty userName, skipping injection"
**Problem**: Profile not saved or userName is empty
**Solution**:
- Re-save profile with a valid name
- Check localStorage: `localStorage.getItem('wem_user_profile')`
- Make sure to enter a name and click "Save Profile"

### Issue 3: Signature shows "undefined" or "null"
**Problem**: userName field is undefined/null
**Solution**:
- This shouldn't happen now due to defensive checks
- If it does, clear data and reconfigure: `localStorage.clear()`

### Issue 4: Signature shows "Response:" instead of user name
**Possible Causes**:
1. **userName is literally "Response"**: Check localStorage
   ```javascript
   JSON.parse(localStorage.getItem('wem_user_profile')).userName
   ```
2. **Browser translation**: Disable auto-translate extensions
3. **Another extension interfering**: Disable other extensions
4. **WhatsApp's own feature**: Check if WhatsApp has a "Response" template

**Solution**:
- Clear localStorage and reconfigure profile
- Disable browser translation
- Test in Incognito mode with only this extension enabled

### Issue 5: Message disappears or doesn't send
**Problem**: WhatsApp doesn't recognize the text change
**Solution**:
- This is fixed by dispatching multiple events (input, change, textInput)
- If still happens, WhatsApp's internal structure may have changed
- May need to use WhatsApp's internal API instead of DOM manipulation

### Issue 6: Signature appears but in wrong format
**Problem**: Format string not being replaced correctly
**Solution**:
- Check the format in localStorage
- Verify {name} placeholder is being replaced
- Check formatSignature logs in console

## Advanced Debugging

### Inspect WhatsApp's Message Box
In Console:
```javascript
// Find the message input element
document.querySelector('[contenteditable="true"][data-tab="10"]')

// Check its content
document.querySelector('[contenteditable="true"][data-tab="10"]').textContent
```

### Monitor localStorage Changes
In Console:
```javascript
// Set up listener for storage changes
window.addEventListener('storage', function(e) {
  console.log('Storage changed:', e.key, e.oldValue, e.newValue);
});
```

### Test formatSignature Manually
In Console:
```javascript
// Get profile
const profile = JSON.parse(localStorage.getItem('wem_user_profile'));

// Test signature formatting
const format = profile.messageFormat || '*{name}:*';
const signature = format.replace('{name}', profile.userName);
console.log('Signature:', signature);
```

## Reporting Issues

If you find the root cause of the "Response:" problem, please document:

1. **What's in localStorage**:
   ```javascript
   localStorage.getItem('wem_user_profile')
   ```

2. **Console logs** when sending a message (copy all [WEM] messages)

3. **Browser and extensions** you're using

4. **Steps to reproduce** the issue

5. **Screenshot** of the problem

## Expected Behavior

✅ **Correct Flow**:
1. User configures name: "João Silva"
2. Profile saved to localStorage: `{userName: "João Silva", messageFormat: "*{name}:*"}`
3. User types: "Hello"
4. Injection adds signature: "*João Silva:* Hello"
5. Message sent with signature

❌ **Incorrect Flow (Reported)**:
1. User configures name: "João Silva"
2. ???
3. User types: "Hello"
4. Message shows: "*Response:* Hello" ← **BUG HERE**
5. Something is replacing João Silva with "Response"

## Next Steps

After identifying the root cause through debugging:
1. Remove unnecessary logging (keep only critical logs)
2. Implement proper fix
3. Test thoroughly
4. Update documentation
5. Create new release
