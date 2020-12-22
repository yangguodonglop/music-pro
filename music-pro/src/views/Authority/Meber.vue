<template>
  <div>
    <a-row>
      <a-col :span="24">
        <a-button type="primary" @click="addAdmin">新增账户</a-button>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="24">
        <a-table :columns="columns" :data-source="data" style="margin-top:20px">
          <a slot="name" slot-scope="text">{{ text }}</a>
          <span slot="customTitle">
            <a-icon type="smile-o" />Name
          </span>
          <span slot="tags" slot-scope="tags">
            <a-tag
              v-for="tag in tags"
              :key="tag"
              :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'"
            >{{ tag.toUpperCase() }}</a-tag>
          </span>
          <span slot="action">
            <a>编辑</a>
            <a-divider type="vertical" />
            <a>删除</a>
          </span>
        </a-table>
      </a-col>
    </a-row>
    <a-modal
      title="Title"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-form
        :form="form"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 12 }"
        @submit="handleSubmit"
      >
        <a-form-item label="姓名">
          <a-input
            v-decorator="['note', { rules: [{ required: true, message: 'Please input your note!' }] }]"
          />
        </a-form-item>
         <a-form-item label="账户名">
          <a-input
            v-decorator="['note1', { rules: [{ required: true, message: 'Please input your note!' }] }]"
          />
        </a-form-item>
         <a-form-item label="电话号码">
          <a-input
            v-decorator="['note2', { rules: [{ required: true, message: 'Please input your note!' }] }]"
          />
        </a-form-item>
         <a-form-item label="性别">
          <a-input
            v-decorator="['note3', { rules: [{ required: true, message: 'Please input your note!' }] }]"
          />
        </a-form-item>
       
        <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
          <a-button type="primary" html-type="submit">Submit</a-button>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>


<script>
const columns = [
  {
    dataIndex: "name",
    title: "账户名",

    key: "name",
    slots: { title: "customTitle" },
    scopedSlots: { customRender: "name1" }
  },
  {
    title: "姓名",
    dataIndex: "age",
    key: "age"
  },
  {
    title: "电话号码",
    dataIndex: "address",
    key: "address"
  },
  {
    title: "性别",
    key: "tags",
    dataIndex: "tags",
    scopedSlots: { customRender: "tags" }
  },
  {
    title: "操作",
    key: "action",
    scopedSlots: { customRender: "action" }
  }
];

const data = [
  {
    key: "1",
    name: "John Brown",
    age: "杨国栋",
    address: "15951813234",
    tags: ["男"]
  },
  {
    key: "2",
    name: "Jim Green",
    age: "杨国栋1",
    address: "15951873234",
    tags: ["男"]
  },
  {
    key: "3",
    name: "Joe Black",
    age: "杨国栋2",
    address: "15951853234",
    tags: ["男"]
  },
  {
    key: "4",
    name: "Joe Black",
    age: "杨国栋2",
    address: "15951853234",
    tags: ["男"]
  },
  {
    key: "5",
    name: "Joe Black",
    age: "杨国栋2",
    address: "15951853234",
    tags: ["男"]
  }
];
export default {
  data() {
    return {
      data,
      columns,
      ModalText: "Content of the modal",
      visible: false,
      confirmLoading: false,
      formLayout: "horizontal",
      form: this.$form.createForm(this, { name: "coordinated" })
    };
  },
  methods: {
    addAdmin() {
      this.visible = true;
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
        }
      });
    },
    handleSelectChange(value) {
      console.log(value);
      this.form.setFieldsValue({
        note: `Hi, ${value === "male" ? "man" : "lady"}!`
      });
    },
    handleOk(e) {
      this.ModalText = "The modal will be closed after two seconds";
      this.confirmLoading = true;
      setTimeout(() => {
        this.visible = false;
        this.confirmLoading = false;
      }, 2000);
    },
    handleCancel(e) {
      console.log("Clicked cancel button");
      this.visible = false;
    }
  }
};
</script>

<style>
</style>