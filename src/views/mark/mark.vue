<template>
    <div class="mark-content">
        <div class="mark-notice">
            <!-- <i-badge v-if="markOrRemark==='mark'" :count="fragment.fragment_refund">
                <router-link
                    :to="{name:'image-annotation.remark', params: {taskId: taskId}}"
                    class="gap-r-sm"
                >
                    打回的标注任务
                </router-link>
            </i-badge> -->
            <!-- <i-badge v-if="markOrRemark==='remark'">
                <router-link
                    :to="{name:'image-annotation.mark', params: {taskId: taskId}}"
                    class="gap-r-sm"
                >
                    返回标注任务
                </router-link>
            </i-badge> -->
        </div>
        <div class="task_info_con">
            <!-- <div class="line1">
                <span class="task_name">任务名: {{ fragment.task_name }}</span>
                <span v-if="fragment.fragment_name" class="fragment_name"> (图片名称: {{ fragment.fragment_name }})</span>
            </div>
            <div class="line2">
                <span class="task_progress_info_item">图片总数: {{ fragment.fragment_account }}</span>
                <span class="task_progress_info_item">剩余图片: {{ fragment.fragment_nonannotated }}</span>
                <span class="task_progress_info_item">我已提交: {{ fragment.fragment_annotated }}</span>
            </div> -->
        </div>
        <div>
            <!-- <div class="task_timer_con">
                <span class="task_timer_item">任务用时: {{ fragment.task_duration | dst }}</span>
                <span
                    v-if="markOrRemark==='mark' && fragmentStatus !== 'locked'"
                    class="task_timer_item"
                >
                    切片倒计时: {{ markDuration | dst(['minute', 'second']) }}
                </span>
                <span
                    v-if="markOrRemark==='mark' && fragmentStatus === 'locked'"
                    class="task_timer_item"
                >
                    您已超时，请<a @click="reloadFragment">刷新</a>后再次标注
                </span>
            </div> -->

            <!-- <i-collapse v-if="fragment && fragment.reject_reason" v-model="rejectMsgOpen">
                <i-panel name="1">
                    打回理由
                    <p slot="content">{{ fragment.reject_reason }}</p>
                </i-panel>
            </i-collapse> -->

            <i-row class="mark-main">
                <!-- <div v-show="noMarked" class="mark-mask" /> -->
                <i-col span="24">
                    <div class="mark-tools">
                        <span class="mark-tools-aline mark-tools-text gap-r-md">工具:</span>
                        <span class="mark-tools-aline gap-r-md">
                            <i-button
                                :type="mouseStatus === 'drag' ? 'primary' : 'default'"
                                size="small"
                                @click="handleToggleMouseStatus"
                            >拖动</i-button>
                        </span>
                        <span class="mark-tools-aline gap-r-md">
                            <i-button
                                :type="mouseStatus === 'draw' && drawShapType === 'rectangle' ? 'primary' : 'default'"
                                size="small"
                                @click="handleSetDrawAndDrawShapType('rectangle')"
                            >绘矩形</i-button>
                        </span>
                        <span class="mark-tools-aline gap-r-md">
                            <i-button
                                :type="mouseStatus === 'draw' && drawShapType === 'quadrilateral' ? 'primary' : 'default'"
                                size="small"
                                @click="handleSetDrawAndDrawShapType('quadrilateral')"
                            >绘四边形</i-button>
                        </span>
                        <span class="mark-tools-aline gap-r-sm" title="缩小">
                            <i-button
                                size="small"
                                icon="md-remove"
                                @click.native="handleZoom('in')"
                                @dblclick.native.stop
                            />
                        </span>
                        <span class="mark-tools-aline gap-r-sm">{{ Math.round(zoom * 100) + '%' }}</span>
                        <span class="mark-tools-aline gap-r-md" title="放大">
                            <i-button
                                size="small"
                                icon="md-add"
                                @click.native="handleZoom('out')"
                                @dblclick.native.stop
                            />
                        </span>
                        <span class="inspect-tools-aline gap-r-md" title="自适应大小">
                            <i-button
                                size="small"
                                icon="md-qr-scanner"
                                @click.native="handleZoomAuto"
                                @dblclick.native.stop
                            />
                        </span>
                    </div>
                </i-col>
                <i-col span="3">
                    <div class="mark-layer">
                        <!-- <mark-layer :data="markList" :active-name="activeMark.index" @on-select="handleSelectActiveIndex" /> -->
                    </div>
                </i-col>
                <i-col span="17">
                    <div ref="mark-element" class="mark-element" @dblclick="handleToggleMouseStatus">
                        <!-- <paint-component ref="canvas-component" :scale="zoom" :background-image="fragment.source" :drawable="mouseStatus === 'draw'" /> -->
                    </div>
                </i-col>
                <i-col span="4">
                    <div class="mark-labels">
                        <!-- <div class="noneed-mark">
                            <i-checkbox v-model="noMarked" @on-change="handlenoMarked">无需标注</i-checkbox>
                        </div>
                        <div v-if="activeMark.index">
                            <multi-level-labels v-if="fragment.is_exist_label" :data="labelList" v-model="activeMark.labels" class="gap-t-lg" />
                            <i-input
                                v-if="fragment.is_exist_text"
                                ref="activeMarkInput"
                                v-model="activeMark.text"
                                :autosize="{minRows: 10,maxRows: 20}"
                                type="textarea"
                                placeholder="请输入文本"
                                class="gap-t-lg"
                            />
                        </div> -->
                    </div>
                </i-col>
            </i-row>

            <!-- <div class="text-center gap-t-md">
                <i-button
                    :disabled="fragmentStatus === 'request' || fragmentStatus === 'locked'"
                    :loading="fragmentStatus === 'request'"
                    type="primary"
                    @click="handleSubmit"
                >提交(CTRL+ENTER)</i-button>
            </div> -->
        </div>

        <!-- <div v-else-if="taskStatus === 'loading'" class="prompt-message">
            <div class="fragment-loading"><i-spin size="large" /></div>
        </div> -->

        <!-- <div v-else class="prompt-message">
            <i-icon type="md-sad" />
            <span v-if="taskStatus === 'building'">您的任务还没有生成，请耐心等待</span>
            <span v-else-if="taskStatus === 'complete'">您的任务已标注完，请选择其他任务标注</span>
            <span v-else-if="taskStatus === 'nofragment' && markOrRemark === 'mark' && !!fragment.fragment_refund">本任务没有未标注的数据了，请修改打回的标注任务</span>
            <span v-else-if="taskStatus === 'nofragment' && markOrRemark === 'mark' && !fragment.fragment_refund">本任务没有未标注的数据了，请选择其他任务进行标注</span>
            <span v-else-if="taskStatus === 'nofragment' && markOrRemark === 'remark'">本任务没有待修改的数据了，请选择其他任务进行标注</span>
            <span v-else-if="taskStatus === 'error'">{{ errorMessage }}</span>
        </div> -->
    </div>
</template>

<script src="./mark.js" />
<style lang="less" src="./mark.less">
