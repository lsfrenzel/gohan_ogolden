import gohanImage from "@assets/generated_images/Golden_retriever_hero_portrait_6a2efb2c.png";

export default function HeroSection() {
  return (
    <div className="relative py-20 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background opacity-80"></div>
      
      <div className="relative max-w-4xl mx-auto text-center">
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="w-64 h-64 rounded-full overflow-hidden border-8 border-primary shadow-xl">
              <img 
                src={gohanImage} 
                alt="Gohan the golden retriever" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center text-3xl shadow-lg">
              🐾
            </div>
          </div>
        </div>
        
        <h1 className="font-display text-6xl md:text-7xl font-bold text-foreground mb-4">
          Gohan's Journey
        </h1>
        <p className="font-heading text-2xl md:text-3xl text-muted-foreground mb-6">
          A Golden Life Full of Love & Adventures
        </p>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Welcome to Gohan's timeline! Follow the amazing journey of our beloved golden retriever, from his adorable puppy days to the wonderful companion he is today.
        </p>
      </div>
      
      <div className="absolute top-10 left-10 text-6xl opacity-5 select-none">🐾</div>
      <div className="absolute bottom-10 right-10 text-6xl opacity-5 select-none">🐾</div>
      <div className="absolute top-1/2 right-20 text-4xl opacity-5 select-none">🐾</div>
    </div>
  );
}
