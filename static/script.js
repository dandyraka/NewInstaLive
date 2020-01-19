var lastUuid = "";
var commentCache = [];

$(document).ready(function () {
    let blackOverlay = $('#black-overlay');
    let modal = $('.modal');

    $('.close').on('click', function () {
        blackOverlay.fadeOut();
        modal.fadeOut();
    });
    $('#stop-streaming').on('click', function () {
        blackOverlay.fadeIn();
        $('#modal-stop-streaming').fadeIn();
    });
    $('#archive').on('click', function () {
        sendRequest('end', 'yes');
        blackOverlay.fadeOut();
        $('#modal-stop-streaming').fadeOut();
    });
    $('#discard').on('click', function () {
        sendRequest('end', 'no');
        blackOverlay.fadeOut();
        $('#modal-stop-streaming').fadeOut();
    });
    $('#comment').on('click', function () {
        blackOverlay.fadeIn();
        $('#modal-comment').fadeIn();
    });
    $('#comment-button').on('click', function () {
        sendRequest('comment', document.getElementById('comment-text').value);
        document.getElementById('comment-text').value = '';
        blackOverlay.fadeOut();
        $('#modal-comment').fadeOut();
    });
    $('#block').on('click', function () {
        blackOverlay.fadeIn();
        $('#modal-block').fadeIn();
    });
    $('#block-button').on('click', function () {
        sendRequest('block', document.getElementById('block-text').value);
        document.getElementById('block-text').value = '';
        blackOverlay.fadeOut();
        $('#modal-block').fadeOut();
    });
    $('#show-question').on('click', function () {
        blackOverlay.fadeIn();
        $('#modal-question').fadeIn();
    });
    $('#question-button').on('click', function () {
        sendRequest('showquestion', document.getElementById('question-text').value);
        document.getElementById('question-text').value = '';
        blackOverlay.fadeOut();
        $('#modal-question').fadeOut();
    });
    $('#about').on('click', function () {
        blackOverlay.fadeIn();
        $('#modal-about').fadeIn();
    });
    $('#ecomments').on('click', function () {
        sendRequest('ecomments', '[]');
    });
    $('#dcomments').on('click', function () {
        sendRequest('dcomments', '[]');
    });
    $('#url').on('click', function () {
        sendRequest('url', '[]');
    });
    $('#key').on('click', function () {
        sendRequest('key', '[]');
    });
    $('#viewers').on('click', function () {
        sendRequest('viewers', '[]');
    });
    $('#questions').on('click', function () {
        sendRequest('questions', '[]');
    });
    $('#hidequestion').on('click', function () {
        sendRequest('hidequestion', '[]');
    });
    $('#info').on('click', function () {
        sendRequest('info', '[]')
    });
    // blackOverlay.fadeIn();
    // $('#modal-waiting').fadeIn();
});
setInterval(function () {
    $.ajax({
        url: '/tick',
        type: 'GET'
    }).done(function (data) {
        if (data.uuid === lastUuid) {
            return;
        }
        lastUuid = data.uuid;
        document.getElementById("username").innerHTML = "@" + data.username;
        document.getElementById("");
        let console = document.getElementById("command-response");
        data.consoleOutput.forEach(function (line) {
            console.value += line + '\n';
            console.scrollTop = console.scrollHeight;
        });
        let likes = document.getElementById("like-response");
        data.likes.forEach(function (line) {
            likes.value += line + '\n';
            likes.scrollTop = likes.scrollHeight;
        });
        let comments = $("#comment-box");
        data.comments.forEach(function (comment) {
            commentCache[comment.commentId] = comment.username + ': ' + comment.text;
            comments.append('<li><span class="comment">' + comment.username + ': ' + comment.text + '</span><i class="fas fa-map-pin float-right badge badge-green" onclick="pinComment(\'' + comment.commentId + '\')"><span class="tooltip-green">Pin Comment</span></i><i class="fas fa-mitten float-right badge badge-yellow" onclick="sendRequest(\'wave\', comment.userid)"><span class="tooltip-yellow">Wave at User</span></i></li>');
            comments.scrollTop(comments[0].scrollHeight);
        });
    })
}, 500);

function pinComment(commentId) {
    sendRequest('pin', commentId);
    $("#pinned-span")[0].innerHTML = commentCache[commentId];
    $("#pinned")[0].removeAttribute("hidden");
}

function unpinComment() {
    sendRequest('unpin', '[]');
    $("#pinned")[0].setAttribute("hidden", '');
}

function sendRequest(request, values) {
    values = values + "";
    $.ajax({
        url: '/request',
        type: 'POST',
        data: {
            "cmd": request,
            "values": [values.replace("[", "").replace("]", "").replace("\"", "").replace("\"", "")]
        },
        dataType: 'json'
    });
}