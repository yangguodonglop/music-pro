<template>
  <div>
    <a-row>
      <a-col :span="24">
        <a-button type="primary" @click="addAdmin">新增账户11</a-button>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="24">
        <a-table :columns="columns" :data-source="data" style="margin-top:20px">
          <a slot="name" slot-scope="text">{{ text }}</a>
          <span slot="customTitle">
            <a-icon type="smile-o" />Name
          </span>
          <!-- <span slot="tags" slot-scope="tags" >
            <a-tag
              v-for="tag in tags"
              :key="tag"
              :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'"
            >{{ tag.toUpperCase() }}</a-tag>
          </span>-->
          <span slot="action" slot-scope="text, record">
            <a @click="onEdit(record)">编辑</a>
            <a-divider type="vertical" />

            <a-popconfirm
              title="确定要删除此账号？"
              ok-text="Yes"
              cancel-text="No"
              @confirm="confirm(record)"
              @cancel="cancel(record)"
            >
              <a href="#">删除</a>
            </a-popconfirm>

            <a-divider type="vertical" />
            <a @click="onAuthorization(record)">授权</a>
          </span>
        </a-table>
      </a-col>
    </a-row>
    <a-modal :title="titleType" :visible="visible" @ok="handleOk" @cancel="handleCancel"    okText="确定" cancelText="取消">
      <a-form
        :form="form"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 12 }"
        @submit="handleSubmit"
      >
        <a-form-item label="用户名">
          <a-input
            v-decorator="['userName', { rules: [{ required: true, message: '请输入用户名!' }] }]"
          />
        </a-form-item>
        <a-form-item label="密码" v-if="passwordType">
          <a-input
            type="password"
            v-decorator="['password', { rules: [{ required: true, message: '请输入密码!' }] }]"
          />
        </a-form-item>
        <a-form-item label="姓名">
          <a-input
            v-decorator="['nName', { rules: [{ required: true, message: '请输入姓名!' }] }]"
          />
        </a-form-item>
        <a-form-item label="手机号">
          <a-input
            v-decorator="['telephone', { rules: [{ required: true, message: '请输入手机号!' }] }]"
          />
        </a-form-item>
        <a-form-item label="微信号">
          <a-input
            v-decorator="['weiXin', { rules: [{ required: true, message: '请输入微信号!' }] }]"
          />
        </a-form-item>
      </a-form>
    </a-modal>
    <a-modal title="授权" :visible="visibleAuthorization"    okText="确定" cancelText="取消" @ok="handleOkTree" @cancel="handleCancel1">
      <a-row>
        <a-col :span="24">
          <a-tree
            v-model="checkedKeys"
            checkable
            :expanded-keys="expandedKeys"
            :auto-expand-parent="autoExpandParent"
            :selected-keys="selectedKeys"
            :tree-data="treeData"
            @expand="onExpand"
            @select="onSelect"
          />
        </a-col>
      </a-row>
    </a-modal>
  </div>
</template>


<script>
const treeData = [
 
									{"key": 100, "title": "超级管理员",	 "func": [2100, 2101]  },
									{"key": 101, "title": "总监制","func": [2200, 2201, 2202, 2203]	},
									{"key": 102, "title": "制作人",  "func": [2301, 2300,2302]	},
									{"key": 103, "title": "词曲作者","func": [2400, 2401, 2402]	},
									{"key": 104, "title": "编曲组长",   "func": [2401]	},
									{"key": 105, "title": "编曲师", "func": [2501, 2502]	},
									{"key": 106, "title": "录音组长", "func": [2503,2501]	},
									{"key": 107, "title": "录音师",     "func": [2601, 2502]	},
									{"key": 108, "title": "混音组长",     "func": [2901, 2902]	},
									{"key": 109,	"title": "混音师",			"func": [2502]	},
									{"key": 110,	"title": "发行组长",			"func": [2502]	},
									{"key": 111,	"title": "发行专员",			"func": [2502]	},
									{"key": 112,	"title": "法务",			"func": [2502]	},
									{"key": 113,	"title": "财务",			"func": [2502]	},
									{"key": 114,	"title": "客户",			"func": [2502]	}
];
const columns = [
  {
    dataIndex: "userName",
    title: "编号",
    key: "userName",
    slots: { title: "customTitle" },
    scopedSlots: { customRender: "name1" }
  },
  {
    title: "歌曲名称",
    dataIndex: "nName",
    key: "nName"
  },
  {
    title: "作词人",
    dataIndex: "telephone",
    key: "telephone"
  },
  {
    title: "作曲人",
    key: "weiXin",
    dataIndex: "weiXin",
    scopedSlots: { customRender: "tags" }
  },
    {
    title: "词曲",
    key: "weiXin",
    dataIndex: "weiXin",
    scopedSlots: { customRender: "tags" }
  },
    {
    title: "分配制作人",
    key: "weiXin",
    dataIndex: "weiXin",
    scopedSlots: { customRender: "tags" }
  },
    {
    title: "编曲",
    key: "weiXin",
    dataIndex: "weiXin",
    scopedSlots: { customRender: "tags" }
  },
    {
    title: "录音",
    key: "weiXin",
    dataIndex: "weiXin",
    scopedSlots: { customRender: "tags" }
  },
    {
    title: "缩混",
    key: "weiXin",
    dataIndex: "weiXin",
    scopedSlots: { customRender: "tags" }
  },
    {
    title: "交付",
    key: "weiXin",
    dataIndex: "weiXin",
    scopedSlots: { customRender: "tags" }
  },
    {
    title: "试听情况",
    key: "weiXin",
    dataIndex: "weiXin",
    scopedSlots: { customRender: "tags" }
  },
    {
    title: "发行主体",
    key: "weiXin",
    dataIndex: "weiXin",
    scopedSlots: { customRender: "tags" }
  },
    {
    title: "发行前工作",
    key: "weiXin",
    dataIndex: "weiXin",
    scopedSlots: { customRender: "tags" }
  },
    {
    title: "发行时间",
    key: "weiXin",
    dataIndex: "weiXin",
    scopedSlots: { customRender: "tags" }
  },
    {
    title: "发行人员",
    key: "weiXin",
    dataIndex: "weiXin",
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
    userName: "John Brown",
    nName: "杨国栋",
    telephone: "15951813234",
    weiXin: "yangguodonglop"
  },
  {
    key: "2",
    userName: "Jim Green",
    nName: "杨国栋1",
    telephone: "15951873234",
    weiXin: "yangguodonglop1"
  },
  {
    key: "3",
    userName: "Joe Black",
    nName: "杨国栋2",
    telephone: "15951853234",
    weiXin: "yangguodonglop2"
  },
  {
    key: "4",
    userName: "Joe Black",
    nName: "杨国栋2",
    telephone: "15951853234",
    weiXin: "yangguodonglop3"
  },
];
import {
  apiUserList,
  apiRegistered,
  apiDeleteList,
  apiEditList,
  apiAuthorizationList,
  apiUserNameList
} from "@/request/api"; // 导入我们的api接口

export default {
  data() {
    return {
      data,
      columns,
      ModalText: "Content of the modal",
      visible: false,
      visibleEdit: false,
      confirmLoading: false,
      formLayout: "horizontal",
      form: this.$form.createForm(this, { name: "coordinated" }),
      expandedKeys: [],
      autoExpandParent: true,
      checkedKeys: [],
      selectedKeys: [],
      treeData,
      visibleAuthorization: false,
      text: "9999",
      passwordType: true,
      titleType: "新增",
      authorizationId: ""
      // formEdit: this.$form.createForm(this, { name: "coordinated" }),
    };
  },
  watch: {
    checkedKeys(val) {
      console.log("onCheck", val);
    }
  },

  mounted: function() {
    this.queryAdminInfo();
  },
  methods: {
    //查询账户列表
    queryAdminInfo() {
      const param = { key: localStorage.getItem("admin")};
      apiUserList(param).then(res => {
        console.log(res);
        if (res.state == 0) {
          // res.funcGroup.map((item, index) => {
          //   item.key = index;
          //   //this.data[index].userName=item.userName
          //   // this.data[index].key=index
          // });
          // this.data = res.funcGroup;
          // this.data = [...this.data];
          // console.log(this.data);
          // this.$router.push("/Authority/Group");
        } else {
          this.$message.error("密码错误，请从新登陆！");
        }
      });
    },
    //新增
    addAdmin() {
      this.visible = true;
      this.passwordType = true;
      this.titleType = "新增";
      this.form.resetFields();

      console.log(this.form);
    },
    //打开编辑
    onEdit(item) {
      this.visible = true;
      this.passwordType = false;
      this.titleType = "编辑";

      console.log(item);
      this.form.resetFields();
      this.$nextTick(() => {
        this.form.setFieldsValue({
          userName: item.userName,
          nName: item.userName,
          telephone: item.telephone,
          weiXin: item.weiXin
        });
      });
    },
    //确认删除
    confirm(e) {
      console.log(e);
      const param = {
        key: localStorage.getItem("admin"),
        userName: [e.userName]
      };
      apiDeleteList(param).then(res => {
        console.log(res);
        if (res.state == 0) {
          this.visible = false;
          this.$message.success("删除成功！");
          this.queryAdminInfo();
        } else {
          this.$message.error("删除失败，请重新删除");
        }
      });
    },
    //取消删除
    cancel(e) {
      console.log(e);
      this.$message.error("Click on No");
    },
    //保存
    handleSubmit(e) {
      e.preventDefault();

      this.form.validateFields((err, values) => {
        if (!err) {
          if (this.titleType === "新增") {
            const param = {
              userName: values.userName,
              password: values.password,
              nName: values.nName,
              telephone: values.telephone,
              weiXin: values.weiXin
            };
            apiRegistered(param).then(res => {
              console.log(res);
              if (res.state == 0) {
                this.visible = false;
                this.$message.success("注册成功！");
                this.queryAdminInfo();
              } else {
                this.$message.error("注册失败，请重新注册");
              }
            });
          } else {
            const param = {
              key: localStorage.getItem("admin"),
              userName: values.userName,
              item: {
                // password: "123456",
                nName: values.nName,
                telephone: values.telephone,
                weiXin: values.weiXin
              }
            };
            apiEditList(param).then(res => {
              console.log(res);
              if (res.state == 0) {
                this.visible = false;
                this.$message.success("编辑成功！");
                this.queryAdminInfo();
              } else {
                this.$message.error("编辑失败，请重新编辑");
              }
            });
          }
        }
      });
    },
    //编辑
    handleSubmitEdit(e) {
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
      this.handleSubmit(e);
    },
    handleCancel(e) {
      console.log("Clicked cancel button");
      this.visible = false;
    },
    handleOkEdit(e) {
      this.visibleEdit = false;
      // this.ModalText = "The modal will be closed after two seconds";
      // this.confirmLoading = true;
      // setTimeout(() => {

      //   this.confirmLoading = false;
      // }, 2000);
    },
    handleCancelEdit(e) {
      console.log("Clicked cancel button");
      this.visibleEdit = false;
    },
    handleOkTree(e) {
      console.log(this.checkedKeys);
      let tempArr = [];
      this.checkedKeys.filter(item => {
        tempArr.push(parseInt(item));
      });
      console.log(tempArr);
      const param = {
        key: localStorage.getItem("admin"),
        userName: this.authorizationId,
        action: 1,
        funcGroup: tempArr
      };
      apiAuthorizationList(param).then(res => {
        console.log(res);
        if (res.state == 0) {
          this.visible = false;
          this.$message.success("授权成功！");
          this.queryAdminInfo();
        } else {
          this.$message.error("授权失败，请重新授权");
        }
      });

      // this.ModalText = "The modal will be closed after two seconds";
      // this.confirmLoadng = true;
      this.visibleAuthorization = false;
    },
    handleCancel1(e) {
      console.log("Clicked cancel button");
      this.visibleAuthorization = false;
    },
    onExpand(expandedKeys) {
      // console.log("onExpand", expandedKeys);
      // if not set autoExpandParent to false, if children expanded, parent can not collapse.
      // or, you can remove all expanded children keys.
      this.expandedKeys = expandedKeys;
      this.autoExpandParent = false;
    },
    onCheck(checkedKeys) {
      //console.log("onCheck", checkedKeys);
      this.checkedKeys = checkedKeys;
    },
    onSelect(selectedKeys, info) {
      console.log("onSelect", info);
      this.selectedKeys = selectedKeys;
    },
    onAuthorization(item) {
      this.checkedKeys=[]
      console.log(item);
      const param = {
         key: localStorage.getItem("admin") ,
         userName:item.userName
         };
      apiUserNameList(param).then(res => {
        console.log(res);
        if (res.state == 0) {
           this.checkedKeys= res.data.funcGroup
          // res.funcGroup.map((item, index) => {
          //   item.key = index;
          //   //this.data[index].userName=item.userName
          //   // this.data[index].key=index
          // });
          // this.data = res.funcGroup;
          // this.data = [...this.data];
          // console.log(this.data);
          // this.$router.push("/Authority/Group");
        } else {
          // this.$message.error("密码错误，请从新登陆！");
        }
      });
      //queryAdminInfo()
      this.authorizationId = item.userName;
      this.visibleAuthorization = true;
    }
  }
};
</script>

<style>
</style>