import instance from '../utils/axios'

// 根据分类id拿取资源
export async function getResource(typeId: number) {
    return await instance('/resources/type', {
        method: 'get',
        params: {
            id: typeId
        }
    })
}

// 获取所有分类及其子分类
export async function getType() {
    return await instance('/resources', {
        method: 'get'
    })
}