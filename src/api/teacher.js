import request from "@/utils/request"

export default{
    list(){
        return request({
            url:"/admin/edu/teacher/list",
            method:'get'
        })
    },
    pageList(page,limit,serchObj){
        return request({
                url:`/admin/edu/teacher/list/${page}/${limit}`,
                method:'get',
                params:serchObj
        })
    },
    updateById(teacher){
        return request({
            url:'/admin/edu/teacher/update',
            method:'put',
            data:teacher
        })
    },
    save(){
        return request({
            url:"/admin/edu/teacher/save",
            method:"get"
        })
    },
    removeById(id){
        return request({
            url: `/admin/edu/teacher/remove/${id}`,
            method: 'delete'
        })
    },
    save(teacher){
        return request({
            url: '/admin/edu/teacher/save',
            method: 'post',
            data:teacher
        })
    },
    getById(id){
        return request({
            url:`/admin/edu/teacher/get/${id}`,
            method:'get'
        })
    },
    batchRemove(idlist){
        return request({
            url:`/admin/edu/teacher/batch-remove/${idlist}`,
            method:'delete'
        })
    },
    selectNameListByKey(key){
        return request({
            url:`/admin/edu/teacher/list/name/${key}`,
            method:"get"
        })
    }
}