<?php
/** @noinspection PhpComposerExtensionStubsInspection */

if (!file_exists(__DIR__ . '/../utils.php') || !file_exists(__DIR__ . '/../goLive.php')) {
    echo 'Missing utils.php or goLive.php from parent directory';
    exit(1);
}
require_once __DIR__ . '/../utils.php';

$result = json_decode(exec("php ../goLive.php --dumpCmds"), true);

Utils::log("# Console Commands for v" . exec("php ../goLive.php --dumpVersion"));
Utils::log("|Command|Description|Argument|");
Utils::log("|-|-|-|");

foreach ($result as $cur) {
    $cur = json_decode($cur, true);
    Utils::log('|' . $cur['name'] . '|' . $cur['description'] . '|' . ($cur['argument'] === '' ? "N/A" : $cur['argument']) . '|');
}
