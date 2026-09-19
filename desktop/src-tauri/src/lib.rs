#![cfg_attr(not(any(doc, feature = "custom-protocol")), no_default_library_externs)]
#![cfg_attr(not(any(doc, feature = "custom-protocol")), no_main)]
#![doc = include_str!("../README.md")]

use tauri::Manager;

#[tauri::command]
pub fn greet(name: &str) -> String {
    format!("Hello, {}! Welcome to OpenMarketing Hub.", name)
}

#[cfg_attr(not(any(doc, feature = "custom-protocol")), no_mangle)]
pub extern "C" fn openmarketing_hub_lib_init() -> *mut std::ffi::c_void {
    use tauri::Builder;
    let app = Builder::default()
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
    Box::into_raw(Box::new(app)) as *mut std::ffi::c_void
}

pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
