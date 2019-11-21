<template>
  <div class="page">
    <div class="tools">
      <div v-for="(item, index) in tools" :key="index">
        <div class="title">{{ item.group }}</div>
        <div class="buttons">
          <a
            v-for="(btn, i) in item.children"
            :key="i"
            :title="btn.name"
            :draggable="btn.data"
            @dragstart="onDrag($event, btn)"
          >
            <i :class="`iconfont ${btn.icon}`"></i>
          </a>
        </div>
      </div>
    </div>
    <div id="topology-canvas" class="full"></div>
    <div class="props">
      <CanvasProps :props.sync="props" @change="onUpdateProps"></CanvasProps>
    </div>
  </div>
</template>

<script>
import { Topology } from 'topology-core'
import { Node } from 'topology-core/models/node'
import { Line } from 'topology-core/models/line'
import * as FileSaver from 'file-saver'

import { Tools, canvasRegister } from './canvas.service'

import CanvasProps from '~/components/CanvasProps'

export default {
  data() {
    return {
      tools: Tools,
      canvas: {},
      canvasOptions: {
        rotateCursor: '/img/rotate.cur'
      },
      props: {
        node: null,
        line: null,
        multi: false
      }
    }
  },
  components: {
    CanvasProps
  },
  created() {
    canvasRegister()
  },
  mounted() {
    this.canvasOptions.on = this.onMessage
    this.canvas = new Topology('topology-canvas', this.canvasOptions)
  },
  methods: {
    onDrag(event, node) {
      event.dataTransfer.setData('Text', JSON.stringify(node.data))
    },
    onMessage(event, data) {
      switch (event) {
        case 'node':
        case 'addNode':
          this.props = {
            node: data,
            line: null,
            multi: false
          }
          break
        case 'line':
        case 'addLine':
          this.props = {
            node: null,
            line: data,
            multi: false
          }
          break
        case 'multi':
          this.props = {
            node: null,
            line: null,
            multi: true
          }
          break
        case 'space':
          this.props = {
            node: null,
            line: null,
            multi: false
          }
          break
        case 'moveOut':
          break
        case 'moveNodes':
        case 'resizeNodes':
          if (data.length > 1) {
            this.props = {
              node: null,
              line: null,
              multi: true
            }
          } else {
            this.props = {
              node: data[0],
              line: null,
              multi: false
            }
          }
          break
        case 'resize':
        case 'scale':
        case 'locked':
          if (this.canvas) {
          }
          break
      }
    },
    onUpdateProps(node) {
      this.canvas.updateProps(node)
    }
  }
}
</script>

<style lang="scss">
.page {
  display: flex;
  width: 100%;
  height: 100%;

  .tools {
    flex-shrink: 0;
    width: 1.75rem;
    background-color: #f8f8f8;
    border-right: 1px solid #d9d9d9;
    overflow-y: auto;

    .title {
      color: #0d1a26;
      font-weight: 600;
      font-size: 0.12rem;
      line-height: 1;
      padding: 0.05rem 0.1rem;
      margin-top: 0.08rem;
      border-bottom: 1px solid #ddd;

      &:first-child {
        border-top: none;
      }
    }

    .buttons {
      padding: 0.1rem 0;
      a {
        display: inline-block;
        color: #314659;
        line-height: 1;
        width: 0.4rem;
        height: 0.4rem;
        text-align: center;
        text-decoration: none !important;

        .iconfont {
          font-size: 0.24rem;
        }
      }
    }
  }

  .full {
    flex: 1;
    width: initial;
    position: relative;
    overflow: auto;
    background: #fff;
  }

  .props {
    flex-shrink: 0;
    width: 2.4rem;
    padding: 0.1rem 0;
    background-color: #f8f8f8;
    border-left: 1px solid #d9d9d9;
    overflow-y: auto;
    position: relative;
  }
}
</style>
