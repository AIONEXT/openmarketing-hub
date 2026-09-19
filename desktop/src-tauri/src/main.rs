#![cfg_attr(not(any(doc, feature = "custom-protocol")), no_default_library_externs)]
#![cfg_attr(not(any(doc, feature = "custom-protocol")), no_main)]

use tauri::Manager;

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! Welcome to OpenMarketing Hub.", name)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
