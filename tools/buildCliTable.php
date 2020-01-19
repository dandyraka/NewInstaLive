<?php
/** @noinspection PhpComposerExtensionStubsInspection */

if (!file_exists(__DIR__ . '/../utils.php') || !file_exists(__DIR__ . '/../goLive.php')) {
    echo 'Missing utils.php or goLive.php from parent directory';
    exit(1);
}
require_once __DIR__ . '/../utils.php';

$result = json_decode(exec("php ../goLive.php --dumpCli"), true);

Utils::log("# Command Line Arguments for v" . exec("php ../goLive.php --dumpVersion"));
Utils::log("|Name|Command-Line Argument|Description|");
Utils::log("|-|-|-|");

foreach ($result as $cur) {
    $cur = json_decode($cur, true);
    if ($cur['humanName'] === "") {
        continue;
    }

    Utils::log('|' . $cur['humanName'] . '|' . $cur['tacks']['mini'] . ($cur['tacks']['full'] === null ? "" : (' ; ' . $cur['tacks']['full'])) . '|' . $cur['description'] . '|');
}