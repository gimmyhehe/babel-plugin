import _metaData from '../../meta.js';
import { getCurrentInstance as _getCurrentInstance } from 'vue';
import { callEntry, beforeCallEntry, afterCallEntry } from '@opentiny/tiny-engine-common';
/* callEntry */
import { reactive } from 'vue';
import { deepCopy } from 'loash-es';
export const useRenderless = callEntry(({
  props
}) => {
  const state = reactive({
    tableData: props.data || props.op.data || []
  });
  beforeCallEntry({
    _metaData: {
      id: `${_metaData.id}.logMessage`
    },
    instance: _getCurrentInstance(),
    utils: {
      props,
      state,
      logMessage,
      aaa,
      handleClick,
      bbb,
      sendMessage,
      ttt,
      reactive,
      deepCopy,
      useRenderless
    }
  });
  const logMessage = callEntry(() => {
    const t = '123';
    console.log('我是纯函数我不需要闭包参数');
  }, {
    _metaData: {
      id: `${_metaData.id}.logMessage`
    },
    instance: _getCurrentInstance(),
    utils: {
      props,
      state,
      logMessage,
      aaa,
      handleClick,
      bbb,
      sendMessage,
      ttt,
      reactive,
      deepCopy,
      useRenderless
    }
  });
  afterCallEntry({
    _metaData: {
      id: `${_metaData.id}.logMessage`
    },
    instance: _getCurrentInstance(),
    utils: {
      props,
      state,
      logMessage,
      aaa,
      handleClick,
      bbb,
      sendMessage,
      ttt,
      reactive,
      deepCopy,
      useRenderless
    }
  });
  const aaa = 123;
  beforeCallEntry({
    _metaData: {
      id: `${_metaData.id}.handleClick`
    },
    instance: _getCurrentInstance(),
    utils: {
      props,
      state,
      logMessage,
      aaa,
      handleClick,
      bbb,
      sendMessage,
      ttt,
      reactive,
      deepCopy,
      useRenderless
    }
  });
  const handleClick = callEntry(e => {
    console.log(e.target);
    state.tableData.push({
      key: 'TinyEngine',
      zhCN: '低代码引擎',
      enUS: 'TinyEngine'
    });
  }, {
    _metaData: {
      id: `${_metaData.id}.handleClick`
    },
    instance: _getCurrentInstance(),
    utils: {
      props,
      state,
      logMessage,
      aaa,
      handleClick,
      bbb,
      sendMessage,
      ttt,
      reactive,
      deepCopy,
      useRenderless
    }
  });
  afterCallEntry({
    _metaData: {
      id: `${_metaData.id}.handleClick`
    },
    instance: _getCurrentInstance(),
    utils: {
      props,
      state,
      logMessage,
      aaa,
      handleClick,
      bbb,
      sendMessage,
      ttt,
      reactive,
      deepCopy,
      useRenderless
    }
  });
  const bbb = 321;
  beforeCallEntry({
    _metaData: {
      id: `${_metaData.id}.sendMessage`
    },
    instance: _getCurrentInstance(),
    utils: {
      props,
      state,
      logMessage,
      aaa,
      handleClick,
      bbb,
      sendMessage,
      ttt,
      reactive,
      deepCopy,
      useRenderless
    }
  });
  const sendMessage = callEntry(() => {
    logMessage('自定义是的范德萨');
  }, {
    _metaData: {
      id: `${_metaData.id}.sendMessage`
    },
    instance: _getCurrentInstance(),
    utils: {
      props,
      state,
      logMessage,
      aaa,
      handleClick,
      bbb,
      sendMessage,
      ttt,
      reactive,
      deepCopy,
      useRenderless
    }
  });
  afterCallEntry({
    _metaData: {
      id: `${_metaData.id}.sendMessage`
    },
    instance: _getCurrentInstance(),
    utils: {
      props,
      state,
      logMessage,
      aaa,
      handleClick,
      bbb,
      sendMessage,
      ttt,
      reactive,
      deepCopy,
      useRenderless
    }
  });
  function ttt() {
    logMessage('自定义是的范德萨');
  }
  return {
    state,
    handleClick,
    sendMessage
  };
}, {
  _metaData
});