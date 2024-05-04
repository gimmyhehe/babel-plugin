import metaData from '../meta.js';
import { callEntry, beforeCallEntry, afterCallEntry } from '@opentiny/tiny-engine-common';
/* callEntry */
import { reactive, getCurrentInstance } from 'vue';
import { deepCopy } from 'loash-es';
export const useRenderless = callEntry(({
  props
}) => {
  const state = reactive({
    tableData: props.data || props.op.data || []
  });
  beforeCallEntry({
    metaData: {
      id: `${metaData.id}.logMessage`
    },
    instance: getCurrentInstance(),
    utils: {
      props,
      state,
      logMessage,
      handleClick,
      sendMessage,
      reactive,
      deepCopy,
      useRenderless
    }
  });
  const logMessage = callEntry(() => {
    console.log('我是纯函数我不需要闭包参数');
  }, {
    metaData: {
      id: `${metaData.id}.logMessage`
    },
    instance: getCurrentInstance(),
    utils: {
      props,
      state,
      logMessage,
      handleClick,
      sendMessage,
      reactive,
      deepCopy,
      useRenderless
    }
  });
  afterCallEntry({
    metaData: {
      id: `${metaData.id}.logMessage`
    },
    instance: getCurrentInstance(),
    utils: {
      props,
      state,
      logMessage,
      handleClick,
      sendMessage,
      reactive,
      deepCopy,
      useRenderless
    }
  });
  beforeCallEntry({
    metaData: {
      id: `${metaData.id}.handleClick`
    },
    instance: getCurrentInstance(),
    utils: {
      props,
      state,
      logMessage,
      handleClick,
      sendMessage,
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
    metaData: {
      id: `${metaData.id}.handleClick`
    },
    instance: getCurrentInstance(),
    utils: {
      props,
      state,
      logMessage,
      handleClick,
      sendMessage,
      reactive,
      deepCopy,
      useRenderless
    }
  });
  afterCallEntry({
    metaData: {
      id: `${metaData.id}.handleClick`
    },
    instance: getCurrentInstance(),
    utils: {
      props,
      state,
      logMessage,
      handleClick,
      sendMessage,
      reactive,
      deepCopy,
      useRenderless
    }
  });
  beforeCallEntry({
    metaData: {
      id: `${metaData.id}.sendMessage`
    },
    instance: getCurrentInstance(),
    utils: {
      props,
      state,
      logMessage,
      handleClick,
      sendMessage,
      reactive,
      deepCopy,
      useRenderless
    }
  });
  const sendMessage = callEntry(() => {
    logMessage('自定义是的范德萨');
  }, {
    metaData: {
      id: `${metaData.id}.sendMessage`
    },
    instance: getCurrentInstance(),
    utils: {
      props,
      state,
      logMessage,
      handleClick,
      sendMessage,
      reactive,
      deepCopy,
      useRenderless
    }
  });
  afterCallEntry({
    metaData: {
      id: `${metaData.id}.sendMessage`
    },
    instance: getCurrentInstance(),
    utils: {
      props,
      state,
      logMessage,
      handleClick,
      sendMessage,
      reactive,
      deepCopy,
      useRenderless
    }
  });
  return {
    state,
    handleClick,
    sendMessage
  };
}, {
  metaData: {
    id: `${metaData.id}.useRenderless`
  },
  instance: getCurrentInstance(),
  utils: {
    reactive,
    deepCopy,
    useRenderless
  }
});