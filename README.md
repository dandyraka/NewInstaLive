# InstaLive-PHP 
A PHP script that allows for you to go live on Instagram with any streaming program that supports RTMP!

Built with [mgp25's amazing Instagram Private API Wrapper for PHP](https://github.com/mgp25/Instagram-API/).

InstaLive is a fork of [JRoy/InstagramLive-PHP](https://github.com/JRoy/InstagramLive-PHP).

# Windows / Linux / Mac
1. Install PHP, Composer, and ffmpeg
2. Edit the `USERNAME` and `PASSWORD` inside of the `config.php` file to your Instagram username/password.
3. Command `composer install`
4. Run the `goLive.php` script. (`php goLive.php --dandy`)
5. Open `127.0.0.1` or `localhost` from your browser.

# Termux
1. `pkg install curl`
2. Install Composer :
`curl -sS https://getcomposer.org/installer | php -- --install-dir=/data/data/com.termux/files/usr/bin --filename=composer`
3. Install ffmpeg :
`pkg install ffmpeg`
4. `composer install`
5. Edit the `USERNAME` and `PASSWORD` inside of the `config.php` file to your Instagram username/password.
6. Run the `goLive.php` script. (`php goLive.php --dandy`)
7. ~~Open `127.0.0.1` or `localhost` from your browser.~~

With `--dandy` mode you can run without OBS, just input `File / URL Path` or `Youtube URL` for media source on Command Line.
And you can access the localhost for control panel.

<p align="center">
  <img src="https://github.com/dandyraka/InstaLive/raw/master/Screenshot_6.png" width="350">
  <img src="https://github.com/dandyraka/InstaLive/raw/master/Screenshot_7.png" width="350">
</p>
