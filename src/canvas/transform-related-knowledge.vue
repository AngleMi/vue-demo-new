<template>
    <div>
        <h1>
            transtions,transfrom和animation
        </h1>
        <hr/>
        <h2>Transtions</h2>
        <a href="/" class="trans">经过我～</a>
        <div class="trans_box">
            <div class="trans_list ease">ease</div>
            <div class="trans_list ease_in">ease-in</div>
            <div class="trans_list ease_out">ease-out</div>
            <div class="trans_list ease_in_out">ease-in-out</div>
            <div class="trans_list linear">linear</div>
        </div>
        <hr>
        <h2>transform</h2>
        <span class="trans_box_span trans_skew">transform:skew(35deg);</span>
        <span class="trans_box_span trans_scale">transform:scale(1,0.5);</span>
        <span class="trans_box_span trans_rotate">tansform:rorate(45deg)</span>
        <span class="trans_box_span trans_translate">transform:translate(10px,20px)</span>
        <span class="trans_box_span trans_rotate_skew_scale_translate">transform:skew(30deg) scale(1.1,1.1) rorate(40deg) translate(10px,20px)</span>
        <hr>
        <h2>animations</h2>
        <div class="anim_box test_box"></div>
        <div>
            <img class="anim_fade_image" src="../assets/ps6.jpg" alt="">
            <img src="../assets/ps4.jpg" alt="">
        </div>
    </div>
</template>
<script>
export default {

}
</script>
<style>
/* .trans{
    display: inline-block;
    padding: 1px 8px;
    -webkit-transition-property: background-color;
    -webkit-transition-duration: 0.3s;
    -webkit-transition-timing-function: ease;
} */
.trans{
    display:inline-block;
    padding:1px 8px;
    -webkit-transtion:background-color 0.3s ease;
    -moz-transition:background-color 0.3s ease;
    -o-transition:background-color 0.3s ease;
    transition:background-color 0.3s ease;
}
.trans:hover{
    background-color: #486AAA;
    color:#fff;
}

/* trans_box */
.trans_box{
    padding:20px;
    background-color:#f0f3f9;
}
.trans_list{
    width:10%;
    height:64px;
    margin:10px 0;
    background-color: #486AAA;
    color:#fff;
    text-align: center;
}
.trans_box:hover .trans_list{
    margin-left:89%;
    background-color: #BECEEB;
    color:#333;
    border-radius:25px;
    transform: rotate(360deg)
}
.ease{
    transition:all 4s ease;
}
.ease_in{
    transition:all 4s ease-in;
}
.ease_out{
    transition:all 4s ease-out;
}
.ease_in_out{
    transition:all 4s ease-in-out;
}
.linear{
    transition:all 4s linear;
}
/* trans_box_span */
.trans_box_span{
    display:inline-block;
    margin:10px;
    padding:20px 10px;
    border: 1px solid #beceeb;
    background-color:#f0f3f9;
    transition: all 0.2s ease-in-out;
}
.trans_skew:hover{
    transform: skew(35deg)
}
.trans_scale:hover{
    transform:scale(1,0.5);
}
.trans_rotate:hover{
    transform:rotate(40deg)
}
.trans_translate:hover{
    transform:translate(10px,20px);
}
.trans_rotate_skew_scale_translate:hover{
    transform: skew(30deg) scale(1.1,1.1) rotate(40deg) translate(10px,20px)
}
/* anim_box */
.anim_box{
    width:100px;
    height:100px;
    border:1px solid #beceed;
    background-color: #f0f3f9;
    margin:40px auto;
}
.anim_box:hover{
    -webkit-animation-name:resize;
    -webkit-animation-duration: 1.5s;
    -webkit-animation-iteration-count: 4;
    -webkit-animation-direction: alternate;
    -webkit-animation-timing-function: ease-in-out;
}
@-webkit-keyframes resize{
    0% {
        padding:0;
    }
    50% {
        padding:0 20px;
        background-color: rgba(190,206,235,0.2)
    }
    100% {
        padding: 0 100px;
        background-color: rgba(190,206,235,0.9)
    }
}
/* img_box */
.anim_fade_image{
    position:absolute;
    transition: opacity 1s ease-in-out;
}
.anim_fade_image:hover{
    opacity: 0;
    filter: alpha(opacity=0)
}
</style>
