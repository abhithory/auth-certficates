import Image from 'next/image'

export default function CreateCertificate() {
  return (
    <main className="page_main flex_center flex-col">
      <section className="flex_center page_main flex-col text-center h-full">
        <h1 className="text_highlight_gradient text_sub_heading_size">Genertate your Centificate</h1>
        <h1 className="text_primary_gradient text_big_heading_size">Protect Your Data</h1>
        <h1 className="md:mt-4  text_heading_size">with <span className='text_primary_gradient_2'>DataVault</span></h1>
        <p className='w-9/12 md:w-8/12 lg:w-7/12 xl:w-6/12 text-center mt-8'>DataVault is your secure and private solution for storing passwords and files on the blockchain. Our decentralized application (Dapp) combines encryption technology with the power of blockchain to ensure your data remains safe from unauthorized access.</p>
        <div className="mt-14 ">
          <input type="text" placeholder='Your Name' className='input_1' />
          <input type="text" placeholder='Enter your email' className='input_1' />
          <button className="btn_primary" >
            generate centificate Cetificate
          </button>
        </div>
      </section>
    </main>
  )
}
