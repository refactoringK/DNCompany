import * as answerApi from './modules/answerApi.js'

const zipId = getZipId();

{   // 댓글 처리
    const $answerWriteBtn = document.querySelector('#answerWriteBtn');
    const $answerContent = document.querySelector('#answerContent');

    // 댓글 작성
    $answerWriteBtn.addEventListener('click', (e) => {
        const content = $answerContent.value;
        const answerObj = {
            zipAnswerContent: content
        };

        answerApi.postAnswer(zipId, answerObj, function () {
            $answerContent.value = '';
            loadAnswerList();
        });
    });

    // 진입과 동시에 댓글 로드
    loadAnswerList();

    // 댓글 삭제/수정
    const $answersContainer = document.querySelector('#answers');

    $answersContainer.addEventListener('click', (e) => {
        // console.log(e.target);

        if (e.target.classList.contains('comment-delete-btn')) {
            console.log('삭제 처리')
            if(confirm('정말 삭제하시겠습니까?')) {
                const answerId = e.target.dataset.answerId;
                answerApi.deleteAnswer(answerId, function () {
                    loadAnswerList();
                });
            }


        } else if (e.target.classList.contains('comment-edit-btn')) {
            // console.log('수정 전환 처리')
            const $contentBox = e.target.closest('.comment_qaDetailComment').querySelector('.comment_qaComment');
            createEditForm($contentBox);

        } else if (e.target.classList.contains('edit__edit-btn')) {
            // console.log('수정 완료 처리');
            const answerId = e.target.closest('.comment_qaDetailComment').dataset.answerId;
            const content = e.target.closest('.edit__container').querySelector('.edit__content').value;

            const answerObj = {
                zipAnswerContent : content
            }

            answerApi.patchAnswer(answerId, answerObj, function () {
                loadAnswerList();
            });
        }
    });
}

/**
 * 댓글 수정 아이콘을 눌렀을 때 수정할 textarea와 수정/삭제 버튼을 만드는 함수
 *
 * @param {Node} $contentBox - 수정해야하는 .comment_qaComment 요소 (댓글 내용 div 요소)
 */
function createEditForm($contentBox) {
    const content = $contentBox.textContent;

    const $editContainer = document.createElement('div')
    $editContainer.classList.add('edit__container');

    const $editTextarea = document.createElement('textarea');
    $editTextarea.classList.add('edit__content');

    const $editBtn = document.createElement('button');
    $editBtn.classList.add('edit__edit-btn');
    $editBtn.textContent = '수정';

    const $cancelBtn = document.createElement('button');
    $cancelBtn.classList.add('edit__cancel-btn');
    $cancelBtn.textContent = '취소';
    $cancelBtn.addEventListener('click', function (){
        $editContainer.remove();
        $contentBox.textContent = content;
    });

    $editTextarea.textContent = content;
    $contentBox.textContent = '';
    $editContainer.appendChild($editTextarea);
    $editContainer.appendChild($editBtn);
    $editContainer.appendChild($cancelBtn);

    $contentBox.appendChild($editContainer);

}


/**
 * 댓글 로드 함수
 */
function loadAnswerList(){
    answerApi.getAnswerList(zipId, displayAnswer);
}

/**
 * 댓글 목록을 받아 화면에 삽입하는 함수
 *
 * @param {Array} answerList - 댓글 리스트
 */
function displayAnswer(answerList) {
    console.log(answerList);
    let html = '';

    answerList.forEach(answer => {
        html += `
         <div class="comment_qaDetailComment" data-answer-id="${answer.zipAnswerId}">
            <div class="comment_qaCommentIdWrapper">
                <div class="comment_qaCommentId">${answer.nickname}</div>
                ${answer.usersId === loginUsersId ? `
                <div class="comment_edit_delete">
                    <div class="comment_delete">
                        <img src="/images/zip/icon-delete.png" class="comment-delete-btn" data-answer-id="${answer.zipAnswerId}"/>
                    </div>
                    <div class="comment_edit">
                        <img src="/images/zip/icon-pencil.png" class="comment-edit-btn" data-answer-id="${answer.zipAnswerId}"/>
                    </div>
                </div>
                <div class="comment_qaCommentDate">${answer.zipAnswerCreatedAt}</div>
                ` : ''}
                
            </div>
           
            <div class="comment_qaDetailImgNone"></div>
            <div class="comment_qaComment">${answer.zipAnswerContent}</div>
        </div>
        `;
    });

    document.querySelector('#answers').innerHTML = html;
}



/**
 * 브라우저 URL에서 쿼리스트링의 zipId를 반환하는 함수
 *
 * @returns {string}
 */
function getZipId() {
    const urlParams = new URLSearchParams(location.search);

    return urlParams.get('zipId');
}
































