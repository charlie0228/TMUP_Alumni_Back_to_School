<template>
  <div id="app">
    <el-container>
      <el-header style="height: auto;">
        <h1>2020 臺北醫學大學藥學系<br>系友回娘家</h1>
        <img class="banner" src="./assets/banner.jpg" alt="banner" />
      </el-header>
      <el-main>
        <el-row type="flex">
          <div class="input-area">
            <el-input
              v-model="filterText"
              placeholder="請輸入要查詢的文字"
              @keyup.enter.native="getFilterData"
            >
            </el-input>
          </div>
          <div class="button-area">
            <el-button
              type="primary"
              icon="el-icon-search"
              :loading="isLoading"
              :disabled="!filterText.length"
              @click="getFilterData"
            >
              搜尋
            </el-button>
            <el-button
              type="info"
              icon="el-icon-delete"
              @click="resetData"
              :loading="isLoading"
            >
              清除
            </el-button>
          </div>
        </el-row>

        <el-table
          v-loading="isLoading"
          :data="tableData"
          stripe
          empty-text="查無資料"
          style="font-size: 1rem;"
        >
          <el-table-column
            prop="graduate"
            label="屆別">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="table"
            label="桌次">
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import getData from './api/api';

export default {
  name: 'app',
  data() {
    return {
      rawData: [],
      filterData: [],
      tableData: [],
      filterText: '',
      isLoading: false,
    };
  },
  methods: {
    dataTransform(data) {
      this.tableData = [];
      data.forEach((item) => {
        this.tableData.push({
          graduate: item.gsx$graduate.$t,
          name: item.gsx$name.$t,
          table: item.gsx$table.$t,
        });
      });
    },
    async getFilterData() {
      if (!this.filterText.length) return;
      this.isLoading = true;
      const data = await getData(this.filterText);
      this.isLoading = false;

      this.filterData = data.feed.entry;
      this.dataTransform(this.filterData);
    },
    resetData() {
      this.isLoading = true;
      this.filterText = '';
      this.dataTransform(this.rawData);
      this.isLoading = false;
    },
  },
  created() {
    this.isLoading = true;
    getData().then((data) => {
      this.rawData = data.feed.entry;
      this.dataTransform(this.rawData);
      this.isLoading = false;
    });
  },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Noto+Sans+TC&display=swap');

body {
  min-height: 100vh;
}

#app {
  font-family: 'Noto Sans TC', sans-serif;
  font-size: 16px;

  .el-header {
    text-align: center;

    h1 {
      font-size: 2.5rem;

      @media (max-width: 767px) {
        font-size: 1.5rem;
      }
    }

    .banner {
      @media (max-width: 767px) {
        width: 100%;
      }
    }
  }

  .el-main {
    width: 50%;
    margin: 0 auto;

    @media (max-width: 767px) {
      width: 100%;
    }

    .el-row {
      flex-wrap: wrap;
    }

    .input-area {
      flex: 1 0 auto;
      margin-right: 1rem;
    }

    .button-area {
      @media (max-width: 767px) {
        flex: 1 0 auto;
        margin: 1rem 1rem 0 0;
        text-align: right;
      }
    }
  }
}
</style>
