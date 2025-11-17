#[cfg(target_os = "macos")]
use std::process::Command;

/// Determine whether macOS currently reports clamshell (lid-closed) mode.
#[cfg(target_os = "macos")]
#[tauri::command]
pub fn is_clamshell() -> Result<bool, String> {
    let output = Command::new("ioreg")
        .args(["-r", "-k", "AppleClamshellState", "-d", "4"])
        .output()
        .map_err(|e| format!("Failed to execute ioreg: {}", e))?;

    if !output.status.success() {
        return Err(format!(
            "ioreg command failed with status: {}",
            output.status
        ));
    }

    let stdout = String::from_utf8_lossy(&output.stdout);
    Ok(stdout.contains("\"AppleClamshellState\" = Yes"))
}

/// Determine whether the machine has a built-in display (MacBook laptop).
#[cfg(target_os = "macos")]
#[tauri::command]
pub fn has_builtin_display() -> Result<bool, String> {
    let output = Command::new("ioreg")
        .args(["-l", "-w", "0", "-r", "-c", "IODisplayConnect"])
        .output()
        .map_err(|e| format!("Failed to execute ioreg: {}", e))?;

    if !output.status.success() {
        return Err(format!(
            "ioreg command failed with status: {}",
            output.status
        ));
    }

    let stdout = String::from_utf8_lossy(&output.stdout);
    Ok(stdout.contains("AppleBacklightDisplay")
        || (stdout.contains("built-in") && stdout.contains("IODisplayConnect")))
}

/// Stub for non-macOS platforms.
#[cfg(not(target_os = "macos"))]
#[tauri::command]
pub fn is_clamshell() -> Result<bool, String> {
    Ok(false)
}

/// Stub for non-macOS platforms.
#[cfg(not(target_os = "macos"))]
#[tauri::command]
pub fn has_builtin_display() -> Result<bool, String> {
    Ok(false)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    #[cfg(target_os = "macos")]
    fn clamshell_command_executes() {
        let result = is_clamshell();
        assert!(result.is_ok());
    }

    #[test]
    #[cfg(target_os = "macos")]
    fn builtin_display_command_executes() {
        let result = has_builtin_display();
        assert!(result.is_ok());
    }
}
