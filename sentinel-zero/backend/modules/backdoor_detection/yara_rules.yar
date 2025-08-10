// Règles Yara pour la détection de portes dérobées
// Sentinel Zero - Module Backdoor Detection

rule PHP_Backdoor_Basic {
    strings:
        $eval_post = "eval($_POST"
        $eval_get = "eval($_GET"
        $eval_request = "eval($_REQUEST"
        $system_post = "system($_POST"
        $system_get = "system($_GET"
        $shell_exec = "shell_exec($_"
        $passthru = "passthru($_"
        $exec = "exec($_"
        $preg_replace = "preg_replace"
        $create_function = "create_function"
        $call_user_func = "call_user_func"
        $call_user_func_array = "call_user_func_array"
    condition:
        any of them
}

rule PHP_Backdoor_Obfuscated {
    strings:
        $base64_decode = "base64_decode"
        $gzinflate = "gzinflate"
        $gzuncompress = "gzuncompress"
        $gzdecode = "gzdecode"
        $str_rot13 = "str_rot13"
        $hex2bin = "hex2bin"
        $pack = "pack("
    condition:
        any of them
}

rule PHP_Backdoor_Encoded {
    strings:
        $eval_encoded = /eval\s*\(\s*[\'"]\s*[A-Za-z0-9+/]{20,}\s*[\'"]\s*\)/
        $system_encoded = /system\s*\(\s*[\'"]\s*[A-Za-z0-9+/]{20,}\s*[\'"]\s*\)/
        $exec_encoded = /exec\s*\(\s*[\'"]\s*[A-Za-z0-9+/]{20,}\s*[\'"]\s*\)/
    condition:
        any of them
}

rule JavaScript_Backdoor {
    strings:
        $eval = "eval("
        $function = "Function("
        $setTimeout = "setTimeout"
        $setInterval = "setInterval"
        $innerHTML = "innerHTML"
        $outerHTML = "outerHTML"
        $document_write = "document.write"
    condition:
        any of them and filesize < 1MB
}

rule JavaScript_Encoded {
    strings:
        $eval_base64 = /eval\s*\(\s*atob\s*\(/
        $eval_unicode = /eval\s*\(\s*[\'"]\s*\\u[0-9a-fA-F]{4}/
        $eval_hex = /eval\s*\(\s*[\'"]\s*\\x[0-9a-fA-F]{2}/
    condition:
        any of them
}

rule ASP_Backdoor {
    strings:
        $execute = "Execute("
        $eval = "Eval("
        $response_write = "Response.Write"
        $server_execute = "Server.Execute"
        $server_transfer = "Server.Transfer"
        $include = "Include"
        $execute_global = "ExecuteGlobal"
    condition:
        any of them
}

rule File_Backdoor_Signatures {
    strings:
        $r57 = "r57shell"
        $c99 = "c99shell"
        $b374k = "b374k"
        $weevely = "weevely"
        $chopper = "chopper"
        $kadimus = "kadimus"
        $weevely_php = "weevely.php"
        $r57_php = "r57.php"
        $c99_php = "c99.php"
    condition:
        any of them
}

rule Suspicious_File_Names {
    strings:
        $shell = /shell\.[a-z]{2,4}$/
        $backdoor = /backdoor\.[a-z]{2,4}$/
        $hack = /hack\.[a-z]{2,4}$/
        $admin = /admin\.[a-z]{2,4}$/
        $test = /test\.[a-z]{2,4}$/
        $debug = /debug\.[a-z]{2,4}$/
        $cmd = /cmd\.[a-z]{2,4}$/
    condition:
        any of them and filesize < 10KB
}

rule Encoded_Content {
    strings:
        $base64 = /[A-Za-z0-9+/]{50,}={0,2}/
        $hex = /\\x[0-9a-fA-F]{2}/
        $unicode = /\\u[0-9a-fA-F]{4}/
        $url_encode = /%[0-9a-fA-F]{2}/
    condition:
        any of them and filesize < 100KB
}
