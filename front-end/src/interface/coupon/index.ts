export default interface ICoupon {
    _id: string,
    code: string,
    course: string,
    createdAt: string,
    creator: string,
    max: number,
    percent: string,
    uses: number,
}